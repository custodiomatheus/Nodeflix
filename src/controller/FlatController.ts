import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import FlatRepository from "../database/repository/FlatRepository";

class FlatController {
  async findAll(req: Request, res: Response) {
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

  // TODO -> CRIAR EXCEPTIONS
  async create(req: Request, res: Response): Promise<Response> {
    const flatRepository = getCustomRepository(FlatRepository);

    try {
      const { name, price } = req.body;
      flatRepository.createAndSave(name, price);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const flatRepository = getCustomRepository(FlatRepository);

    try {
      const { id, name, price } = req.body;
      const flatExists = await flatRepository.findOne({ where: { id } });

      if (flatExists) {
        flatRepository.updateById(parseInt(id), name, price);

        return res.sendStatus(200);
      } else {
        return res.status(409).send({ message: "Flat do not exists" });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const flatRepository = getCustomRepository(FlatRepository);

    try {
      const { id } = req.params;

      const flatExists = await flatRepository.findOne({ where: { id } });

      if (flatExists) {
        flatRepository.deleteById(parseInt(id));

        return res.sendStatus(200);
      } else {
        return res.status(409).send({ message: "Flat do not exists" });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
}

export default new FlatController();
