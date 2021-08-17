import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Flat from "./Flat";

@Entity()
export default class Account {
  
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", {
    length: 100,
    nullable: false,
    unique: true
  })
  email!: string;

  @Column("varchar", {
    length: 45,
    nullable: false,
    unique: true
  })
  password!: string;

  @ManyToOne(() => Flat, flat => flat.id)
  flat!: Flat
}