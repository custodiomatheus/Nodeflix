import { EntityRepository, Repository, getRepository } from "typeorm";
import User from "../entity/User";
import Show from "../entity/Show";
import UsersShows from "../entity/UsersShows";

@EntityRepository(UsersShows)
export class UsersShowsRepository extends Repository<UsersShows> {
  findAll() {
    return getRepository(UsersShows)
      .createQueryBuilder("users_shows")
      .leftJoinAndSelect("users_shows.user", "user")
      .leftJoinAndSelect("users_shows.show", "show")
      .getMany();
  }

  findByUser(id: number) {
    return getRepository(UsersShows)
      .createQueryBuilder("users_shows")
      .leftJoinAndSelect("users_shows.user", "user")
      .leftJoinAndSelect("users_shows.show", "show")
      .where(`users_shows.user = ${id}`)
      .getMany();
  }

  findUserFavorites(id: number) {
    return getRepository(UsersShows)
      .createQueryBuilder("users_shows")
      .leftJoinAndSelect("users_shows.user", "user")
      .leftJoinAndSelect("users_shows.show", "show")
      .where(`users_shows.user = ${id}`)
      .andWhere(`users_shows.is_favorite = true`)
      .getMany();
  }

  findUserWatched(id: number) {
    return getRepository(UsersShows)
      .createQueryBuilder("users_shows")
      .leftJoinAndSelect("users_shows.user", "user")
      .leftJoinAndSelect("users_shows.show", "show")
      .where(`users_shows.user = ${id}`)
      .andWhere(`users_shows.is_watched = true`)
      .getMany();
  }

  findByUserAndShow(userId: number, showId: number) {
    return getRepository(UsersShows)
      .createQueryBuilder("users_shows")
      .leftJoinAndSelect("users_shows.user", "user")
      .leftJoinAndSelect("users_shows.show", "show")
      .where(`users_shows.user = ${userId}`)
      .andWhere(`users_shows.show = ${showId}`)
      .getOne();
  }

  async addFavorite(user: User, show: Show) {
    const usersShows = await this.findByUserAndShow(user.id, show.id);

    if (!usersShows) {
      this.save({
        user,
        show,
        is_favorite: true,
        is_watched: false,
      });
    } else {
      getRepository(UsersShows)
        .createQueryBuilder()
        .update(UsersShows)
        .set({ user, show, is_favorite: true })
        .where(`users_shows.userId = ${user.id}`)
        .andWhere(`users_shows.showId = ${show.id}`)
        .execute();
    }
  }

  async addWatched(user: User, show: Show) {
    const usersShows = await this.findByUserAndShow(user.id, show.id);

    if (!usersShows) {
      this.save({
        user,
        show,
        is_favorite: false,
        is_watched: true,
      });
    } else {
      getRepository(UsersShows)
        .createQueryBuilder()
        .update(UsersShows)
        .set({ user, show, is_watched: true })
        .where(`users_shows.userId = ${user.id}`)
        .andWhere(`users_shows.showId = ${show.id}`)
        .execute();
    }
  }

  async updateUsersShows(usersShows: UsersShows) {
    const usersShowsExists = await this.findByUserAndShow(
      usersShows.user.id,
      usersShows.show.id
    );

    if (!usersShowsExists) {
      this.save({
        user: usersShows.user,
        show: usersShows.show,
        is_favorite: usersShows.is_favorite,
        is_watched: usersShows.is_watched,
      });
    } else {
      getRepository(UsersShows)
        .createQueryBuilder()
        .update(UsersShows)
        .set({
          user: usersShows.user,
          show: usersShows.show,
          is_favorite: usersShows.is_favorite,
          is_watched: usersShows.is_watched,
        })
        .where(`users_shows.userId = ${usersShows.user.id}`)
        .andWhere(`users_shows.showId = ${usersShows.show.id}`)
        .execute();
    }
  }
}
