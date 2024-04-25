import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configViewEngine = (app) => {
  // Set the default template engine
  app.set("view engine", "hbs");
  // Set the views directory path
  app.set("views", path.join("./src", "resources", "views"));
  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));
};

export { configViewEngine };
