import { EntityRepository, Repository } from "typeorm";
import Flat from "../entity/Flat";

@EntityRepository(Flat)
export default class FlatRepository extends Repository<Flat> {
  findAll(): Promise<Flat[]> {
    return this.find({ select: ["id", "name", "price"] });
  }
}
