import { EntityRepository, getRepository, Repository } from "typeorm";
import User from "../entity/User";
import Account from "../entity/Account";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(nickname: string, account: Account): void {
    const user = this.create({ nickname, account });
    this.save(user);
  }

  updateNickname(id: number, nickname: string): void {
    this.save({ id, nickname });
  }

  findUserFavorites(id: number): Promise<User | undefined> {
    return getRepository(User)
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.favorites", "favorite")
            .innerJoinAndSelect("favorite.show", "show")
            .where(`user.id = ${id}`)
            .getOne();
  }
}