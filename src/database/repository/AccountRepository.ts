import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/Account";
import Flat from "../entity/Flat";
@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  findAll(): Promise<Account[]> {
    return this.find({
      select: ["id", "email", "flat", "users"],
      relations: ["flat", "users"],
    });
  }

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

  updateById(id: number, email: string, flat: Flat): void {
    this.save({ id, email, flat });
  }

  deleteById(id: number): void {
    this.delete({ id });
  }

  findByEmail(email: string): Promise<Account | undefined> {
    return this.findOne({
      select: ["id", "email", "password", "flat"],
      relations: ["flat"],
      where: { email },
    });
  }
}
