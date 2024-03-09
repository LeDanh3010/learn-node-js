import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { route } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(morgan("combined"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//to access value of POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Set the views directory path
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

//start webserver
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
