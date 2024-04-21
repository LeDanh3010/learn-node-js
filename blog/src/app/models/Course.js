import mongoose from "mongoose";
import slugify from "slugify";
import mongoose_delete from "mongoose-delete";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 630 },
    image: { type: String, maxLength: 630 },
    videoId: { type: String, require: true },
    level: { type: String, require: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);
CourseSchema.plugin(AutoIncrement);
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValueType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValueType ? req.query.type : "desc",
    });
  }
  return this;
};

CourseSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

CourseSchema.pre("save", function (next) {
  // Generate slug from the name field
  this.slug = slugify(this.name, { lower: true });
  next();
});

const myModel = mongoose.model("course", CourseSchema);
export default myModel;
