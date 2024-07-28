import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  creator: string;

  @Column()
  create_date: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: number;

  @Column()
  @Index()
  task_id: number;
}
