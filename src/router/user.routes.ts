import { Router } from "express";
import UserController from "../controller/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.post(`/`, authMiddleware, UserController.create);
routes.patch(`/`, authMiddleware, UserController.updateNickname);
routes.get(`/favorites/:id`, authMiddleware, UserController.findUsersFavorites);

module.exports = routes;
