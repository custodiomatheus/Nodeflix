import express from "express";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private async database(): Promise<void> {
    await createConnection({
      type: "",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      entities: [__dirname + "/database/entity/*.ts"],
    })
      .then(() => console.log("Database connected succesfully"))
      .catch((error) => console.error(error));
  }

  private routes(): void {
    this.express.use("/flat", require("./router/flat.routes"));
    this.express.use("/account", require("./router/account.routes"));
    this.express.use("/user", require("./router/user.routes"));
  }
}

export default new App();
