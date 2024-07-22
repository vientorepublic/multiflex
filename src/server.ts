import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { cpus } from 'os';
import cluster from 'cluster';
import { NestExpressApplication } from '@nestjs/platform-express';

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
      console.log(`Master process ${process.pid} is running.`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.warn(`worker ${worker.process.pid} died`);
      });
    } else {
      await app.listen(this.port, '0.0.0.0');
      console.log(`Worker ${process.pid} started.`);
    }
  }
}
