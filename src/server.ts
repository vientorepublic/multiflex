import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';
import { cpus } from 'os';
import cluster from 'cluster';
import consola from 'consola';

export class Bootstrap {
  public port: number;
  constructor(port: number) {
    this.port = port;
  }

  public async start(): Promise<void> {
    const numCPUs = cpus().length;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.disable('x-powered-by');
    if (cluster.isPrimary) {
      consola.success(`Master process PID ${process.pid} is running.`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        consola.warn(
          `worker ${worker.process.pid} died. Exit code ${code}, Signal: ${signal}`,
        );
        cluster.fork();
      });
    } else {
      app.listen(this.port, '0.0.0.0');
      consola.info(`Worker ID ${cluster.worker?.id} started.`);
    }
  }
}
