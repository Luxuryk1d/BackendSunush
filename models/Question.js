const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    datetime: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: Array,
    published: {
        type: Boolean,
        default: false
    },
    answers: Number,
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region",
        required: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    newId: String
});

QuestionSchema.plugin(mongoosePagination);

QuestionSchema.methods.publishe = function() {
    this.published = false;
};
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;