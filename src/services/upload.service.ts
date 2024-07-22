import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { MessageDto } from 'src/dto/message.dto';
import { FileEntity } from 'src/entities/file.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

const uploadPath = process.env.UPLOAD_PATH || join('..', '..', 'upload');

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async upload(file: Express.Multer.File): Promise<MessageDto> {
    const identifier = uuidV4();
    const isExists = existsSync(uploadPath);
    if (!isExists) {
      mkdirSync(uploadPath, { recursive: true });
    }
    writeFileSync(join(uploadPath, identifier), file.buffer, {
      encoding: 'utf-8',
    });
    const data = this.fileRepository.create({
      identifier,
      original_filename: file.originalname,
    });
    this.fileRepository.save(data);
    return {
      message: 'SUCCESS',
    };
  }
}
