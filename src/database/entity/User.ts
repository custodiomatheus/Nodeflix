import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Account from "./Account";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", {
    length: 45,
    nullable: false,
  })
  nickname!: string;

  @ManyToOne(() => Account, (account) => account.id)
  account!: Account;
}
