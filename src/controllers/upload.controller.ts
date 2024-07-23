import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from 'src/dto/upload.dto';
import { UploadService } from 'src/services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadDto> {
    return this.uploadService.upload(file);
  }
}
