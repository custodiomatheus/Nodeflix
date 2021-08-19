import { Router } from "express";
import FlatController from "../controller/FlatController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get(`/`, authMiddleware, FlatController.findAll);
routes.post(`/`, authMiddleware, FlatController.create);
routes.put(`/`, authMiddleware, FlatController.update);
routes.delete(`/:id`, authMiddleware, FlatController.delete);

module.exports = routes;