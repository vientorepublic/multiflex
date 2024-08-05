import { Cron, CronExpression } from '@nestjs/schedule';
import { FileEntity } from 'src/entities/file.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';

const uploadPath =
  process.env.UPLOAD_PATH || join(__dirname, '..', '..', 'upload');
const period = Number(process.env.EXPIRES) || 86400000;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async removeExpiredFiles() {
    const now = new Date().getTime();
    const files = await this.fileRepository.find();
    for (let i = 0; i < files.length; i++) {
      const uploadAt = Number(files[i].upload_at);
      if (uploadAt + period < now) {
        this.fileRepository.delete({ identifier: files[i].identifier });
        this.logger.log(`Automatic cleanup: ${files[i].identifier}`);
        try {
          unlinkSync(join(uploadPath, files[i].identifier));
        } catch (err) {
          this.logger.error(err);
        }
      }
    }
  }
}
