const path = require("path");
const rootPath = __dirname;
const multer = require("multer");
const {nanoid} = require("nanoid");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(rootPath, "public/uploads"));
  },
  filename: (req, file, cb) => {
      cb(null, nanoid() + path.extname(file.originalname));
  }
});

let dbName = "practical_project_api";

if (process.env.NODE_ENV === "test") {
  dbName = "practical_project_api_test";
}

const upload = multer({storage});

module.exports = {
  upload,
  rootPath,
  options: {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
  },
  uploadPath: path.join(rootPath, "public/uploads"),
  db: {
    name: "practical_project_api",
    url: "mongodb://localhost"
  }
};