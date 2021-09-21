import { EntityRepository, Repository } from "typeorm";
import Show from "../entity/Show";

@EntityRepository(Show)
export class UserRepository extends Repository<Show> {}
