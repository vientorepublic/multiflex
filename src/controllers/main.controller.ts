import { Controller, Get } from '@nestjs/common';
import { MainResponseDto } from 'src/dto/main.dto';
import { MainService } from 'src/services/main.service';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  public gitData(): MainResponseDto {
    return this.mainService.gitData();
  }
}
