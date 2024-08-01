import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;

  @Column({ unique: true })
  file_path: string;

  @Column()
  @Index()
  project_id: number;
}
