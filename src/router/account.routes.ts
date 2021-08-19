import { Router } from "express";
import AccountController from "../controller/AccountController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get(`/`, authMiddleware, AccountController.findAll);
routes.post(`/`, authMiddleware, AccountController.create);
routes.put(`/`, authMiddleware, AccountController.update);
routes.delete(`/`, authMiddleware, AccountController.delete);
routes.post(`/login`, AccountController.login);

module.exports = routes;