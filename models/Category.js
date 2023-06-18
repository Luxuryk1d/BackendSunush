const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  rusTitle: {
    type: String,
    required: true,
    unique: true
  },
  kgTitle: {
    type: String,
    required: true,
    unique: true
  },
  engTitle: {
    type: String,
    required: true,
    unique: true
  }
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;