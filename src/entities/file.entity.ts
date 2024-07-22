import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  upload_at: Date;

  @Column()
  original_filename: string;

  @Column()
  identifier: string;
}
