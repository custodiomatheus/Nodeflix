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

      if (!id) {
        return res.status(409).send({ message: `The value ${id} is invalid` });
      }

      const accounts = await accountRepository.findUsersAccount(parseInt(id));

      if (accounts?.users.length) {
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

      if (!email || !password || !flat) {
        const message = (type: string, value: any) => {
          return { message: `The value ${value} is invalid to ${type}` };
        };

        if (!email) {
          return res.status(409).send(message("email", email));
        }

        if (!password) {
          return res.status(409).send(message("password", password));
        }

        if (!flat) {
          return res.status(409).send(message("flat", flat));
        }
      }

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

      if (!email || !password) {
        const message = (type: string) => {
          return { message: `The ${type} is required to login` };
        };

        if (!email) {
          return res.status(409).send(message("email"));
        }

        if (!password) {
          return res.status(409).send(message("password"));
        }
      }

      const account = await accountRepository.findByEmail(email);

      if (!account) {
        return res.status(403).send({ message: "Invalid email" });
      }

      const isValidPassword = await bcrypt.compare(password, account.password);

      if (!isValidPassword) {
        return res.status(403).send({ message: "Invalid password" });
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
