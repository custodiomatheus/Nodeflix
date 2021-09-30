import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UserRepository } from "../database/repository/UserRepository";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { nickname, account } = req.body;

      if (!nickname || !account) {
        const message = (type: string, value: any) => {
          return { message: `The value ${value} is invalid to ${type}` };
        };

        if (!nickname) {
          return res.status(409).send(message("nickname", nickname));
        }

        if (!account) {
          return res.status(409).send(message("account", account));
        }
      }

      userRepository.createAndSave(nickname, account);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async updateNickname(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { id, nickname } = req.body;

      const userExists = await userRepository.findOne({ where: { id } });

      if (userExists) {
        userRepository.updateNickname(id, nickname);
        return res.sendStatus(200);
      } else {
        return res
          .status(409)
          .send({ message: `The user with id = ${id} do not exists` });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async findUsersFavorites(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { id } = req.params;

      const favorites = await userRepository.findUserFavorites(parseInt(id));

      if (favorites) {
        return res.status(200).send(favorites);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new UserController();
