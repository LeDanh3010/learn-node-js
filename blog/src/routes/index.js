import newRouter from "./news.js";
import newSiteRouter from "./site.js";
import courses from "./courses.js";
import storeCourses from "./myPage.js";
function route(app) {
  app.use("/myPage", storeCourses);
  app.use("/news", newRouter);
  app.use("/courses", courses);
  app.use("/", newSiteRouter);
}

export { route };
