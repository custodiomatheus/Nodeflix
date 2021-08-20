import { Router } from "express";
import UserController from "../controller/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get(`/`, authMiddleware, UserController.findByAccount);
routes.post(`/`, authMiddleware, UserController.create);
routes.patch(`/`, authMiddleware, UserController.updateNickname);

module.exports = routes;