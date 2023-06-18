const express = require("express");
const cors = require("cors");

const app = express();
require("express-ws")(app);


const questions = require("./app/questions");
const categories = require("./app/categories");
const answers = require("./app/answers");
const users = require("./app/users");
const regions = require("./app/regions");
const admin = require("./app/admin");
const notifications = require("./app/notifications")
const port = process.env.NODE_ENV === "test" ? 8020 : 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/questions", questions);
app.use("/users", users);
app.use("/categories", categories);
app.use("/answers", answers);
app.use("/regions", regions);
app.use("/admin", admin);
app.use("/notifications", notifications)

module.exports = {app, port};