import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from 'src/controllers/upload.controller';
import { FileEntity } from 'src/entities/file.entity';
import { UploadService } from 'src/services/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
