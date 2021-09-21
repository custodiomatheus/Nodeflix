import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AccountRepository from "../database/repository/AccountRepository";

class FlatController {
  async findUsersAccount(req: Request, res: Response): Promise<Response> {
    const accountRepository = getCustomRepository(AccountRepository);

    try {
      const { id } = req.params;

      const accounts = await accountRepository.findUsersAccount(parseInt(id));

      if (accounts) {
        return res.status(200).send(accounts);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const accountRepository = getCustomRepository(AccountRepository);

    try {
      const { email, password, flat } = req.body;
      accountRepository.createAndSave(email, password, flat);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const accountRepository = getCustomRepository(AccountRepository);

    try {
      const { email, password } = req.body;
      const account = await accountRepository.findByEmail(email);

      if (!account) {
        return res.sendStatus(403);
      }
      
      const isValidPassword = await bcrypt.compare(password, account.password);
      
      if (!isValidPassword) {
        return res.sendStatus(403);
      } else {
        const token = jwt.sign({ id: account.id }, process.env.JWT_KEY || "", {
          expiresIn: "1d",
        });

        return res.status(200).send({
          id: account.id,
          email: account.email,
          token,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const accountRepository = getCustomRepository(AccountRepository);

    try {
      const { id, email, password } = req.body;
      accountRepository.findAndUpdate(id, email, password);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new FlatController();
