import { EntityRepository, Repository } from "typeorm";
import Account from "../entity/Account";

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  findAll(): Promise<Account[]> {
    return this.find({ select: ["id", "email", "flat"], relations: ["flat"] });
  }
}
