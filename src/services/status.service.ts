import { FileEntity } from 'src/entities/file.entity';
import { GlobalStatusDto } from 'src/dto/status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

const period = Number(process.env.EXPIRES) || 86400000;

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async getGlobalStatus(): Promise<GlobalStatusDto> {
    const now = new Date().getTime();
    const files = await this.fileRepository.find();
    const fileCount = files.length;
    let cleanupQueue = 0;

    for (let i = 0; i < fileCount; i++) {
      const uploadAt = Number(files[i].upload_at);
      if (uploadAt + period < now) ++cleanupQueue;
    }

    return {
      fileCount,
      cleanupQueue,
    };
  }
}
