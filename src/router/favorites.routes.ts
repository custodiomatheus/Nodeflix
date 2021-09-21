import { Router } from "express";
import FavoriteController from "../controller/FavoriteController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get(`/`, authMiddleware, FavoriteController.findAll);
routes.post(`/`, authMiddleware, FavoriteController.create);
routes.delete(`/`, authMiddleware, FavoriteController.remove);

module.exports = routes;
