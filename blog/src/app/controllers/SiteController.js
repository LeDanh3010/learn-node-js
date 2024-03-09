class siteController {
  home(req, res) {
    res.render("home", { title: "Homepage" });
  }
  search(req, res) {
    res.render("search", { title: "Search" });
  }
}
export const newSiteController = new siteController();
