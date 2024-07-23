import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';
import { cpus } from 'os';
import cluster from 'cluster';

const useCluster = Boolean(process.env.USE_CLUSTER) || false;

export class Bootstrap {
  public port: number;
  constructor(port: number) {
    this.port = port;
  }

  public async start(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.disable('x-powered-by');
    if (useCluster) {
      if (cluster.isPrimary) {
        console.log(`Master process PID ${process.pid} is running.`);

        const numCPUs = cpus().length;
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
          console.warn(
            `worker ${worker.process.pid} died. Exit code ${code}, Signal: ${signal}`,
          );
        });
      } else {
        app.listen(this.port, '0.0.0.0');
        console.log(`Worker ID ${cluster.worker?.id} started.`);
      }
    } else {
      app.listen(this.port, '0.0.0.0');
    }
  }
}
