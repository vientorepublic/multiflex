import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { TasksService } from 'src/services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
