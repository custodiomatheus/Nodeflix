import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersShowsRepository } from "../database/repository/UsersShowsRepository";

class UsersShowsController {
  async findAll(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const usersShows = await usersShowsRepository.findAll();

      if (usersShows) {
        return res.status(200).send(usersShows);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async findByUser(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { id } = req.params;
      const usersShows = await usersShowsRepository.findByUser(parseInt(id));

      if (usersShows) {
        return res.status(200).send(usersShows);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async findUserFavorite(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { id } = req.params;
      const usersShows = await usersShowsRepository.findUserFavorites(
        parseInt(id)
      );

      if (usersShows) {
        return res.status(200).send(usersShows);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async findUserWatched(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { id } = req.params;
      const usersShows = await usersShowsRepository.findUserWatched(
        parseInt(id)
      );

      if (usersShows) {
        return res.status(200).send(usersShows);
      } else {
        return res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async addFavorite(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { user, show } = req.body;
      await usersShowsRepository.addFavorite(user, show);
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);

      return res.status(500).send(error);
    }
  }

  async addWatched(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { user, show } = req.body;
      await usersShowsRepository.addWatched(user, show);
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async updateUsersShows(req: Request, res: Response) {
    const usersShowsRepository = getCustomRepository(UsersShowsRepository);

    try {
      const { user, show, is_favorite, is_watched } = req.body;
      await usersShowsRepository.updateUsersShows({
        user,
        show,
        is_favorite,
        is_watched,
      });

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}

export default new UsersShowsController();
