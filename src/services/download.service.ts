import { Injectable, NotFoundException, Res, Scope } from '@nestjs/common';
import { FileEntity } from 'src/entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DownloadDto } from 'src/dto/download.dto';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { extname, join } from 'path';
import { contentType } from 'mime-types';

const uploadPath = process.env.UPLOAD_PATH || join('..', '..', 'upload');
const period = Number(process.env.EXPIRES) || 86400000;

@Injectable({ scope: Scope.REQUEST })
export class DownloadService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async download(
    @Res() res: Response,
    query: DownloadDto,
  ): Promise<void> {
    const { identifier } = query;
    const now = new Date().getTime();

    const record = await this.fileRepository.findOne({
      where: {
        identifier,
      },
    });
    if (!record) throw new NotFoundException();

    const filePath = join(uploadPath, identifier);
    const exists = existsSync(filePath);
    if (!exists) throw new NotFoundException();

    if (record.upload_at + period < now) {
      unlinkSync(filePath);
      throw new NotFoundException();
    }

    res.set({
      'Content-Type':
        contentType(extname(record.original_filename)) ||
        'application/octet-stream',
      'Content-Disposition': `attachment; filename="${record.original_filename}"`,
    });
    const stream = createReadStream(filePath);
    stream.pipe(res);
  }
}
