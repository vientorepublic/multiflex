import { Module } from '@nestjs/common';
import { MainModule } from './main.module';
import { UploadModule } from './upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'src/database/database.provider';
import { DownloadModule } from './download.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    MainModule,
    UploadModule,
    DownloadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
