import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FavoriteRepository } from "../database/repository/FavoriteRepository";

class FavoriteController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const favorite = await favoriteRepository.findAll();

      if (favorite.length) {
        return res.status(200).send(favorite);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const { user, show } = req.body;

      if (!user || !show) {
        const message = (type: string, value: any) => {
          return { message: `The value ${value} is invalid to ${type}` };
        };

        if (!user) {
          return res.status(409).send(message("user", user));
        }

        if (!show) {
          return res.status(409).send(message("show", show));
        }
      }

      await favoriteRepository.save({ user, show });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const { user, show } = req.body;

      if (!user || !show) {
        const message = (type: string, value: any) => {
          return { message: `The value ${value} is invalid to ${type}` };
        };

        if (!user) {
          return res.status(409).send(message("user", user));
        }

        if (!show) {
          return res.status(409).send(message("show", show));
        }
      }

      await favoriteRepository.remove({ user, show });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }
}

export default new FavoriteController();
