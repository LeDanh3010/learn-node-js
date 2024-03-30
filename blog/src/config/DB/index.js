import mongoose from "mongoose";
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoDB", {});
    console.log("Connected success");
  } catch (e) {
    console.log("Connected failure:", e);
  }
}
export default { connect };

// function connect() {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect("mongodb://127.0.0.1:27017/mongoDB", {
//       })
//       .then(() => {
//         console.log("Connected success");
//         resolve();
//       })
//       .catch((error) => {
//         console.log("Connected failure:", error);
//         reject(error);
//       });
//   });
// }

// export default { connect };
