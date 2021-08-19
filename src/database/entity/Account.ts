import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import Flat from "./Flat";
import bcrypt from "bcryptjs";
@Entity()
export default class Account {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", {
    length: 100,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column("varchar", {
    length: 45,
    nullable: false,
    unique: true,
  })
  password!: string;

  @ManyToOne(() => Flat, (flat) => flat.id)
  flat!: Flat;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
