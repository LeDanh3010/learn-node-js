import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import "dotenv/config";
import { route } from "./routes/index.js";
import db from "./config/DB/index.js";
import methodOverride from "method-override";
import helpers from "./app/helper/handlebars.js";
import SortMiddleware from "./app/middlewares/SortMiddleware.js";
import { configViewEngine } from "./config/viewEngines/viewEngines.js";

const app = express();
const port = process.env.PORT || 3500;

//connect db
db.connect();

app.use(methodOverride("_method"));

app.use(SortMiddleware.SortMiddleware);
// app.use(morgan("combined"));

configViewEngine(app);

//to access value of POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: helpers.helper,
  })
);

route(app);

//start webserver
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
