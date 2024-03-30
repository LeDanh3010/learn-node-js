import myModel from "../models/Course.js";
import mongooseUntil from "../../ultil/mongoose.js";
class siteController {
  //way promise
  home(req, res, next) {
    myModel
      .find({})
      .then((myData) => {
        res.render("home", {
          Courses: mongooseUntil.multipleMongooseObject(myData),
        });
      })
      .catch(next);
  }
  search(req, res) {
    res.render("search", { title: "Search" });
  }
}
export const newSiteController = new siteController();
