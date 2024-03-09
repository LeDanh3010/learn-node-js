class NewsController {
  index(req, res) {
    res.render("news", { title: "News" });
  }
  learnJS(req, res) {
    res.send("learn nodeJs");
  }
}

export const newsController = new NewsController();
