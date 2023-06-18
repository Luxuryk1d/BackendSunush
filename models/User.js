const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");
const mongoosePagination = require("mongoose-paginate-v2");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
with: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    nameWith: String
});
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Поле fullName обязательно для заполнения"],
    },
    phone: {
        type: String,
        required: [true, "Поле phone обязательно для заполнения"],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await User.findOne({phone: value});
                if (user) return false;
            },
            message: (props) => `Номер ${props.value} уже используется`
        }
    },
    blocked: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Поле password обязательно для заполнения"],
        minlength: [8, "Минимальная длина пароля 8 символов"],
        validate: {
            validator: (value) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(value);
            },
            message: "Пароль слишком простой"
        }
    },
    image: String,
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "lawyer","moderator", "accountant"]
    }
});


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};

UserSchema.plugin(mongoosePagination);

const User = mongoose.model("User", UserSchema);

module.exports = User;