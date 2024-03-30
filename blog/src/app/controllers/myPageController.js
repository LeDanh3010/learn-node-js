import myModel from "../models/Course.js";
import mongooseUntil from "../../ultil/mongoose.js";
class myPageController {
  storedCourses(req, res, next) {
    myModel
      .find({})
      .then((courses) =>
        res.render("myPages/myPage", {
          Courses: mongooseUntil.multipleMongooseObject(courses),
        })
      )
      .catch(next);
  }
}
export const MyPageController = new myPageController();
