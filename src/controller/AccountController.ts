import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import Account from "../database/entity/Account";
import AccountRepository from "../database/repository/AccountRepository";

class FlatController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const accountRepository = getCustomRepository(AccountRepository);

    try {
      const accounts = await accountRepository.findAll();

      if (accounts.length) {
        return res.status(200).send(accounts);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new FlatController();
