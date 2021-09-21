import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Flat {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", {
    length: 7,
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column("decimal", {
    precision: 5,
    scale: 2,
    nullable: false,
    unique: true,
  })
  price!: number;
}
