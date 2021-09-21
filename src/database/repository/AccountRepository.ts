import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/Account";
import Flat from "../entity/Flat";
@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  findUsersAccount(id: number): Promise<Account | undefined> {
    return this.findOne({
      select: ["id", "email", "flat", "users"],
      relations: ["flat", "users"],
      where: { id },
    });
  }

  createAndSave(email: string, password: string, flat: Flat): void {
    const account = this.create({ email, password, flat });
    this.save(account);
  }

  findByEmail(email: string): Promise<Account | undefined> {
    return this.findOne({
      select: ["id", "email", "password", "flat"],
      relations: ["flat"],
      where: { email },
    });
  }

  async findAndUpdate(id: number, email: string, password: string): Promise<void> {
    const user = this.create({ email, password });
    this.update(id, user);
  }
}
