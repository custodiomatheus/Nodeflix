import { Router } from "express";
import UsersShowsController from "../controller/UsersShowsController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get(`/`, authMiddleware, UsersShowsController.findAll);
routes.get(`/user/:id`, authMiddleware, UsersShowsController.findByUser);
routes.get(`/user/favorite/:id`, authMiddleware, UsersShowsController.findUserFavorite);
routes.get(`/user/watched/:id`, authMiddleware, UsersShowsController.findUserWatched);
routes.post(`/add-favorite`, authMiddleware, UsersShowsController.addFavorite);
routes.post(`/add-watched`, authMiddleware, UsersShowsController.addWatched);
routes.put(`/`, authMiddleware, UsersShowsController.updateUsersShows);

module.exports = routes;
