import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from "typeorm";
import bcrypt from "bcryptjs";

import Flat from "./Flat";
import User from "./User";
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

  @OneToMany(() => User, (user) => user.account)
  users!: User[]


  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password);
  }
}
