import app from "./app"
import "reflect-metadata";

app.express.listen(3000, () => console.log("Server starter at http://localhost:3000"))