import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FavoriteRepository } from "../database/repository/FavoriteRepository";

class FavoriteController {
  async findAll(req: Request, res: Response) {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const favorite = await favoriteRepository.findAll();

      if (favorite) {
        return res.status(200).send(favorite);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async findUserFavorite(req: Request, res: Response) {
    // const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    // try {
    //   const { id } = req.params;
    //   const usersShows = await usersShowsRepository.findUserFavorites(
    //     parseInt(id)
    //   );

    //   if (usersShows) {
    //     return res.status(200).send(usersShows);
    //   } else {
    //     return res.sendStatus(204);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).send(error);
    // }
  }

  async create(req: Request, res: Response) {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const { user, show } = req.body;
      await favoriteRepository.save({user, show});
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async remove(req: Request, res: Response) {
    const favoriteRepository = getCustomRepository(FavoriteRepository);

    try {
      const { user, show } = req.body;
      
      if(!user || !show) {
        return res.status(409).send({ message: `Missing user or show to remove favorite` });
      }

      await favoriteRepository.remove({user, show});
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }
}

export default new FavoriteController();
