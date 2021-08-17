import { EntityRepository, Repository } from "typeorm";
import Flat from "../entity/Flat";

@EntityRepository(Flat)
export default class FlatRepository extends Repository<Flat> {
  findAll(): Promise<Flat[]> {
    return this.find({ select: ["id", "name", "price"] });
  }

  createAndSave(name: string, price: number): void {
    this.save({ name, price });
  }

  updateById(id: number, name: string, price: number): void {
    this.save({ id, name, price });
  }

  deleteById(id: number): void {
    this.delete({ id: id });
  }
}
