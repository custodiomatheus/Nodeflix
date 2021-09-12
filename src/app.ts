import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";

import dotenv from "dotenv";
dotenv.config({ path: `.env.development.local` });

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
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ""),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/database/entity/*.ts"],
    })
      .then(() => console.log("Database connected succesfully"))
      .catch((error) => console.error(error));
  }

  private routes(): void {
    this.express.use("/flat", require("./router/flat.routes"));
    this.express.use("/account", require("./router/account.routes"));
    this.express.use("/user", require("./router/user.routes"));
    this.express.use("/users-shows", require("./router/usersShows.routes"));
  }
}

export default new App();
