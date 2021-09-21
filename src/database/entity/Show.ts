import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Favorite from "./Favorite";

@Entity({ name: "shows" })
export default class Show {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", {
    nullable: false,
  })
  type!: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];
}
