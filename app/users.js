const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;


router.get("/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(500);
  }
});



router.post("/", config.upload.single("image"), async (req, res) => {
  try {
    if (req.body.role === "admin") {
      return res.status(400).send({ error: "You can't register this role" });
    }
    const isMatch = await User.findOne({ phone: req.body.phone });
    if (isMatch) {
      return res.status(400).send({ error: "Этот номер уже зарегестрирован" });
    } else {
      const user = new User({
        fullName: req.body.fullName,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role,
        blocked: false,
      });

      user.generateToken();
      await user.save();
      res.send(user);
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/sessions", async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone })
  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }

  user.generateToken();
  await user.save({ validateBeforeSave: false });

  res.send(user);
});


router.delete("/sessions", async (req, res) => {
  const token = req.get("Authorization");
  const success = { message: "Success" };

  if (!token) return res.send(success);
  const user = await User.findOne({ token });

  if (!user) return res.send(success);

  user.generateToken();
  user.save({ validateBeforeSave: false });

  return res.send(success);
});




module.exports = router;
