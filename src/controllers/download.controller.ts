import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadDto } from 'src/dto/download.dto';
import { DownloadService } from 'src/services/download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @TypedRoute.Get()
  public downloadFile(
    @Res() res: Response,
    @TypedQuery() query: DownloadDto,
  ): Promise<void> {
    return this.downloadService.download(res, query);
  }
}
