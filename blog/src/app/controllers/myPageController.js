import myModel from "../models/Course.js";
import mongooseUntil from "../../ultil/mongoose.js";
class myPageController {
  storedCourses(req, res, next) {
    let courseQuery = myModel.find({});

    Promise.all([
      courseQuery.sortable(req),
      myModel.countDocumentsWithDeleted({
        deleted: true,
      }),
    ])
      .then(([listCourses, deletedCount]) => {
        const coursesWithButtons = listCourses.map((course) => ({
          ...course.toObject(),
          btnPrimary: "Edit",
          btnSecondary: "Delete",
          isMyPageCourse: true,
        }));
        const templateData = {
          nameTitle: "My courses",
          description: "Data doesn't exist",
          isMyPageCourse: true,
          btnName: "Delete",
          createAndDeletedAt: "Created At",
          deletedCount: deletedCount,
          isDeleteCourse: false,
          Courses: coursesWithButtons,
        };
        res.render("myPages/myPage", templateData);
      })
      .catch(next);
  }
  removedCourse(req, res, next) {
    myModel
      .findWithDeleted({ deleted: true }) // just the documents have deleteAt: null or not display to screen if the documents have deleteAt: value removed
      .then((courses) => {
        const coursesWithButtons = courses.map((course) => ({
          ...course.toObject(),
          btnPrimary: "Restore",
          btnSecondary: "Remove",
          isMyPageCourse: false,
        }));

        const templateData = {
          nameTitle: "Deleted courses",
          description: "Deleted course empty",
          linkTitle: "List Course",
          link: "/myPage/stored/courses",
          btnName: "Remove",
          createAndDeletedAt: "Deleted At",
          isMyPageCourse: false,
          isDeleteCourse: true,
          Courses: coursesWithButtons,
        };
        res.render("myPages/myPage", templateData);
      })
      .catch(next);
    myModel.counterReset("_id", (err) => {
      if (err) {
        console.error("Error resetting counter:", err);
      } else {
        console.log("Counter reset successfully.");
      }
    });
  }
}
export const MyPageController = new myPageController();
