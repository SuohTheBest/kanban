import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  message: string;

  @Column()
  timestamp: number;

  @Column()
  @Index()
  project_id: number;
}
