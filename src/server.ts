import { NestExpressApplication } from '@nestjs/platform-express';
import { winstonLogger } from './libraries/logger';
import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';
import { existsSync, mkdirSync } from 'fs';
import cluster from 'cluster';
import { join } from 'path';
import { cpus } from 'os';

const uploadPath = process.env.UPLOAD_PATH || join(__dirname, '..', 'upload');
const useCluster = Boolean(process.env.USE_CLUSTER) || false;

export class Bootstrap {
  public port: number;
  constructor(port: number) {
    this.port = port;
  }

  private async initialize() {
    // Create upload path
    const isExists = existsSync(uploadPath);
    if (!isExists) {
      mkdirSync(uploadPath, { recursive: true });
    }
  }

  public async start(): Promise<void> {
    this.initialize();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: winstonLogger,
    });
    app.disable('x-powered-by');
    app.enableCors({
      exposedHeaders: ['Content-Type', 'Content-Disposition', 'Content-Length'],
      origin: process.env.FRONTEND_HOST ?? '*',
    });
    if (useCluster) {
      if (cluster.isPrimary) {
        console.log(`Master process PID ${process.pid} is running.`);
        const numCPUs = cpus().length;
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
          console.warn(
            `Worker ${worker.process.pid} died. Exit code ${code}, Signal: ${signal}`,
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
