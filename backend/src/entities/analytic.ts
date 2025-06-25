import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

interface IAnalytic {
  id: number;
  urlShort: string;
  ipAddr: string;
  eventDate: Date;
}

@Entity()
export class Analytic extends BaseEntity implements IAnalytic {
  @PrimaryGeneratedColumn()
  id!: number;

	@Index()
  @Column({ nullable: false })
  urlShort!: string;

  @Column({ nullable: false })
  ipAddr!: string;

  @Column('date', { default: () => 'CURRENT_DATE' })
  eventDate!: Date;
}
