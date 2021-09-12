import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User";
import Show from "./Show";

@Entity("users_shows")
export default class UsersShows {
  @ManyToOne(() => User, (user) => user.userShow)
  @PrimaryColumn("int", {
    name: "userId",
  })
  user!: User;

  @ManyToOne(() => Show, (show) => show.userShow, {
    cascade: ["insert"],
  })
  @PrimaryColumn("int", {
    name: "showId",
  })
  show!: Show;

  @Column("boolean", {
    default: false,
  })
  @PrimaryColumn()
  is_favorite!: boolean;

  @Column("boolean", {
    default: false,
  })
  @PrimaryColumn()
  is_watched!: boolean;
}
