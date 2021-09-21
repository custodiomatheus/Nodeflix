import { EntityRepository, Repository, getRepository } from "typeorm";
import Favorite from "../entity/Favorite";

@EntityRepository(Favorite)
export class FavoriteRepository extends Repository<Favorite> {
  findAll(): Promise<Favorite[]> {
    return getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.user", "user")
      .leftJoinAndSelect("favorite.show", "show")
      .getMany();
  }

  findUserFavorites(id: number): Promise<Favorite[]> {
    return getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.user", "user")
      .where(`favorite.user = ${id}`)
      .getMany();
  }

  findByUserAndShow(userId: number, showId: number): Promise<Favorite | undefined> {
    return getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.user", "user")
      .leftJoinAndSelect("favorite.show", "show")
      .where(`favorite.user = ${userId}`)
      .andWhere(`favorite.show = ${showId}`)
      .getOne();
  }
}
