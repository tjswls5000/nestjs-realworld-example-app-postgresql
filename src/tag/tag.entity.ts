import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

@Entity()
export class Tag {

  @PrimaryKey()
  id!: number;

  @Property()
  tag!: string;

}
