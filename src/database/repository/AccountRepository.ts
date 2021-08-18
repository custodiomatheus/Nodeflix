import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/Account";
import Flat from "../entity/Flat";

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  findAll(): Promise<Account[]> {
    return this.find({ select: ["id", "email", "flat"], relations: ["flat"] });
  }

  createAndSave(email: string, password: string, flat: Flat): void {
    this.save({ email, password, flat });
  }

  updateById(id: number, email: string, flat: Flat): void {
    this.save({ id, email, flat });
  }

  deleteById(id: number): void {
    this.delete({ id });
  }

  login(email: string, password: string): Promise<Account | undefined> {
    return this.findOne({ select: ["id", "email", "flat"], relations: ["flat"], where: { email, password } });
  }
}
