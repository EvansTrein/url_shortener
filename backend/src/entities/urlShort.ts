import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

interface IUrlShort {
  id: number;
  originalUrl: string;
  shortUrl: string;
  expiresAt: Date;
  createdAt: Date;
  clickCount: number;
}

@Entity()
export class UrlShort extends BaseEntity implements IUrlShort {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  originalUrl!: string;

  @Column({ nullable: false, unique: true })
  shortUrl!: string;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ default: 0 })
  clickCount!: number;
}
