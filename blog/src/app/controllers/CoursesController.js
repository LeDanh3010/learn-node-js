import myModel from "../models/Course.js";
import mongooseUntil from "../../ultil/mongoose.js";
class CoursesController {
  courses(req, res, next) {
    myModel
      .findOne({ slug: req.params.slug })
      .then((result) =>
        res.render("courses/course", {
          course: mongooseUntil.mongooseToObject(result),
        })
      )
      .catch(next);
  }
  create(req, res, next) {
    const templateData = {
      title: "Courses",
      nameButton: "Create Course",
      //attribute
      nameValue: "",
      desValue: "",
      videoValue: "",
      levelValue: "",
      method: "POST",
      action: "/courses/store",
      isTextArea: false,
    };
    res.render("courses/create", templateData);
  }
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = "https://files.fullstack.edu.vn/f8-prod/courses/2.png";
      const newCourse = new myModel(formData);
      await newCourse.save();
      res.redirect("/");
    } catch (e) {
      console.error("Error:", e);
    }
  }
  edit(req, res, next) {
    myModel
      .findById(req.params.id)
      .then((course) => {
        const templateData = {
          title: "Courses information",
          nameButton: "Save",
          //attribute
          nameValue: course.name,
          content: course.description,
          videoValue: course.videoId,
          levelValue: course.level,
          method: "POST",
          action: `/courses/${course._id}?_method=PUT`,
          isTextArea: true,
        };
        res.render("courses/create", templateData);
      })
      .catch(next);
  }
  update(req, res, next) {
    myModel
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/myPage/stored/courses"))
      .catch(next);
  }
  delete(req, res, next) {
    myModel
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
export const coursesController = new CoursesController();
