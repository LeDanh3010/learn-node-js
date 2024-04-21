import myModel from "../models/Course.js";
import mongooseUntil from "../../ultil/mongoose.js";
class CoursesController {
  async courses(req, res, next) {
    try {
      const result = await myModel.findOne({ slug: req.params.slug });
      if (!result) {
        return res.status(404).send("Course not found");
      }
      res.render("courses/course", {
        course: mongooseUntil.mongooseToObject(result),
      });
    } catch (e) {
      next(e);
    }
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
      req.body.image = "https://files.fullstack.edu.vn/f8-prod/courses/2.png";
      const newCourse = new myModel(req.body);
      await newCourse.save();
      res.redirect("/");
    } catch (e) {
      console.error("Error:", e);
    }
  }

  async edit(req, res, next) {
    try {
      const result = await myModel.findById(req.params.id);
      if (!result) {
        return res.status(404).send("Course not found");
      }
      const templateData = {
        title: "Courses information",
        nameButton: "Save",
        //attribute
        nameValue: result.name,
        content: result.description,
        videoValue: result.videoId,
        levelValue: result.level,
        method: "POST",
        action: `/courses/${result._id}?_method=PUT`,
        isTextArea: true,
      };
      res.render("courses/create", templateData);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      await myModel.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/myPage/stored/courses");
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await myModel.delete({ _id: req.params.id });
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  }

  async handleAllForm(req, res, next) {
    try {
      switch (req.body.action) {
        case "Delete":
          await myModel.delete({ _id: { $in: req.body.courseIds } });
          res.redirect("back");
          break;
        case "Remove":
          await myModel.deleteMany({ _id: { $in: req.body.courseIds } });
          res.redirect("back");
          break;
        case "Restore":
          await myModel.restore({ _id: { $in: req.body.courseIds } });
          res.redirect("back");
          break;
        default:
          res.json("Something went wrong");
          break;
      }
    } catch (e) {
      next(e);
    }
  }

  async forceRemove(req, res, next) {
    try {
      await myModel.deleteOne({ _id: req.params.id });
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  }

  async restore(req, res, next) {
    try {
      await myModel.restore({ _id: req.params.id });
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  }
}
export const coursesController = new CoursesController();
