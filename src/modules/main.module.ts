import { Module } from '@nestjs/common';
import { MainController } from 'src/controllers/main.controller';
import { MainService } from 'src/services/main.service';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
