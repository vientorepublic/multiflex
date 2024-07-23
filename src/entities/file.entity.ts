import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  upload_at: number;

  @Column()
  original_filename: string;

  @Column()
  identifier: string;
}
