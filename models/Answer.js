const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
});


const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;