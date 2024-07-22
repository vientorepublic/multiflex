import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

export class Bootstrap {
  public port: number;
  constructor(port: number) {
    this.port = port;
  }

  public async start(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    await app.listen(this.port, '0.0.0.0');
  }
}
