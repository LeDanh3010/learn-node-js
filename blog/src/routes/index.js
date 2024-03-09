import newRouter from "./news.js";
import newSiteRouter from "./site.js";
function route(app) {
  app.use("/news", newRouter); // Use the newsRouter for the /news route

  app.use("/", newSiteRouter);
}

export { route };
