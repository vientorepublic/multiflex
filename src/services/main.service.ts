import { Injectable } from '@nestjs/common';
import { MainResponseDto } from 'src/dto/main.dto';

@Injectable()
export class MainService {
  gitData(): MainResponseDto {
    const { CURRENT_GIT_SHA, CURRENT_GIT_BRANCH } = process.env;
    return {
      CURRENT_GIT_SHA,
      CURRENT_GIT_BRANCH,
    };
  }
}
