import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['file_name', 'project_id'])
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;

  @Column()
  file_path: string;

  @Column()
  @Index()
  project_id: number;
}
