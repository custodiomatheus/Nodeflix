import { EntityRepository, Repository } from "typeorm";
import User from "../entity/User";
import Account from "../entity/Account";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(nickname: string, account: Account): void {
    const user = this.create({ nickname, account });
    this.save(user);
  }

  findByAccount(account: Account): Promise<User[]> {
    return this.find({
      where: { account: account },
      relations: ["account"],
    });
  }

  updateNickname(id: number, nickname: string) {
    this.save({ id, nickname });
  }
}
