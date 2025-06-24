import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

interface IAnalytic {
  urlShort: string;
  listIP: string[];
}

@Entity()
export class Analytic extends BaseEntity implements IAnalytic {
  @PrimaryColumn()
  urlShort!: string;

  @Column('json', { default: '[]' })
  listIP!: string[];
}
