const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


router.get("/moderators", [auth, permit("admin")], async (req, res) => {
    try {
        const moderators = await User.find({role: 'moderator'});
        res.send(moderators);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post("/moderator", [auth, permit("admin")], async (req, res) => {
    try {
        if (req.body.role === "admin") {
            return res.status(400).send({error: "You can't register this role"});
        }

        const user = new User({
            fullName: req.body.fullName,
            phone: req.body.phone,
            password: req.body.password,
            role: "moderator",
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});


router.delete("/moderators/:id", [auth, permit("admin")], async (req, res) => {
    const result = await User.findByIdAndRemove({_id: req.params.id});
    if (result) {
        res.send("Moderator removed");
    } else {
        res.sendStatus(404);
    }
});


router.get("/blocked", [auth, permit("admin")], async (req, res) => {
    const result = await User.find({blocked: true});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.patch("/block/:id", [auth, permit("admin", "moderator")], async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: true});
        res.send({message: "Success"});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch("/unblock/:id", [auth, permit("admin", "moderator")], async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: false});
        res.send({message: "Success"});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
