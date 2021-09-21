import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User";
import Show from "./Show";

@Entity("favorite")
export default class Favorites {
  @ManyToOne(() => User, (user) => user.favorites)
  @PrimaryColumn("int", {
    name: "userId",
  })
  user!: User;

  @ManyToOne(() => Show, (show) => show.favorites, {
    cascade: ["insert", "remove"],
  })
  
  @PrimaryColumn("int", {
    name: "showId",
  })
  show!: Show;
}
