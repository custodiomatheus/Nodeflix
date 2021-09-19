import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UsersShows from "./UsersShows";

@Entity({ name: "shows" })
export default class Show {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", {
    nullable: false
  })
  type!: string

  @OneToMany(() => UsersShows, (userShow) => userShow.show, {
    cascade: true,
  })
  userShow!: UsersShows[];
}
