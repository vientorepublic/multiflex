import { Module } from '@nestjs/common';
import { MainModule } from './main.module';
import { UploadModule } from './upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'src/database/database.provider';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), MainModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
