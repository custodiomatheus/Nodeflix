import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Account from "./Account";
import UsersShows from "./UsersShows";

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

  @OneToMany(() => UsersShows, (userShow) => userShow.user)
  userShow!: UsersShows[];
}
