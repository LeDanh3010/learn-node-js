import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("filename", __filename);
console.log("dirname", __dirname);
const app = express();
const port = 3000;

app.use(morgan("combined"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));

// app.use(express.static(path.join(__dirname, "src", "public")));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Set the views directory path
app.set("views", path.join(__dirname, "resources", "views"));

app.get("/", (req, res) => {
  res.render("home", { title: "Homepage" });
});

app.get("/news", (req, res) => {
  res.render("news", { title: "News" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
