import { Controller, Get } from '@nestjs/common';
import { GlobalStatusDto } from 'src/dto/status.dto';
import { StatusService } from 'src/services/status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('global')
  public getGlobalStatus(): Promise<GlobalStatusDto> {
    return this.statusService.getGlobalStatus();
  }
}
