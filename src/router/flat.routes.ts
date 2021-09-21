import { Router } from "express";
import FlatController from "../controller/FlatController";

const routes = Router();

routes.get(`/`, FlatController.findAll);

module.exports = routes;