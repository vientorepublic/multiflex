import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { DownloadController } from '../controllers/download.controller';
import { DownloadService } from 'src/services/download.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class DownloadModule {}
