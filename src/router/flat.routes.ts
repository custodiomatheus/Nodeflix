import { Router } from "express";
import FlatController from "../controller/FlatController";

const routes = Router();

routes.get(`/`, FlatController.findAll);
routes.post(`/`, FlatController.create);
routes.put(`/`, FlatController.update);
routes.delete(`/:id`, FlatController.delete);

module.exports = routes;