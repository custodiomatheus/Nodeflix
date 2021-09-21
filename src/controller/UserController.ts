import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UserRepository } from "../database/repository/UserRepository";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { nickname, account } = req.body;
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
        return res.status(409).send({ message: `The user with id ${id} do not exists` });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async findUsersFavorites(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { id } = req.params;

      const users = await userRepository.findUserFavorites(parseInt(id));

      if (users) {
        return res.status(200).send(users);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new UserController();
