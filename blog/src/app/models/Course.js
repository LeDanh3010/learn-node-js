import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;
const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 630 },
    image: { type: String, maxLength: 630 },
    videoId: { type: String, require: true },
    level: { type: String, require: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);
Course.pre("save", function (next) {
  // Generate slug from the name field
  this.slug = slugify(this.name, { lower: true });
  next();
});
const myModel = mongoose.model("course", Course);
export default myModel;
