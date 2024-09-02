import { StatusController } from 'src/controllers/status.controller';
import { StatusService } from 'src/services/status.service';
import { FileEntity } from 'src/entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
