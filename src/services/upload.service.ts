import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { FileEntity } from 'src/entities/file.entity';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadDto } from 'src/dto/upload.dto';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { join } from 'path';

const uploadPath =
  process.env.UPLOAD_PATH || join(__dirname, '..', '..', 'upload');

@Injectable({ scope: Scope.REQUEST })
export class UploadService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async upload(file: Express.Multer.File): Promise<UploadDto> {
    if (!file) throw new BadRequestException();

    const now = new Date().getTime();
    const identifier = uuidV4();
    const isExists = existsSync(uploadPath);
    if (!isExists) {
      mkdirSync(uploadPath, { recursive: true });
    }

    writeFileSync(join(uploadPath, identifier), file.buffer);

    const data = this.fileRepository.create({
      identifier,
      upload_at: now,
      original_filename: file.originalname,
    });
    this.fileRepository.save(data);

    return {
      message: 'SUCCESS',
      identifier,
    };
  }
}
