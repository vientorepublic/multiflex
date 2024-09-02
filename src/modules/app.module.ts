import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { typeormConfig } from 'src/database/database.provider';
import { DownloadModule } from './download.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload.module';
import { StatusModule } from './status.module';
import { TasksModule } from './tasks.module';
import { MainModule } from './main.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    MainModule,
    UploadModule,
    DownloadModule,
    StatusModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
