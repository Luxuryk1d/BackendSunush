const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    datetime: {
        type: Date,
        // required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    viewed: {
      type: Boolean,
      default: false,
      required: true
    },
    rusState: {
        type: String,
        required: true,
        enum: ["Ваш вопрос отклонен", "Ваш вопрос опубликован", "У вас есть новые ответы"]
    }
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;