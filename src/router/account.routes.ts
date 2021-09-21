import { Router } from "express";
import AccountController from "../controller/AccountController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.post(`/`, AccountController.create);
routes.get(`/users/:id`, authMiddleware, AccountController.findUsersAccount);
routes.post(`/login`, AccountController.login);
routes.put(`/`, AccountController.update);

module.exports = routes;