import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import FlatRepository from "../database/repository/FlatRepository";

class FlatController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const flatRepository = getCustomRepository(FlatRepository);

    try {
      const flats = await flatRepository.findAll();

      if (flats.length) {
        return res.status(200).send(flats);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new FlatController();
