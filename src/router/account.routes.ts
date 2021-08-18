import { Router } from "express";
import AccountController from "../controller/AccountController";

const routes = Router();

routes.get(`/`, AccountController.findAll);
routes.post(`/`, AccountController.create);
routes.put(`/`, AccountController.update);
routes.delete(`/`, AccountController.delete);
routes.post(`/login`, AccountController.login);

module.exports = routes;