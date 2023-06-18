const router = require("express").Router();
const auth = require("../middleware/auth");
const Notification = require("../models/Notification");

router.get("/:id", auth, async (req, res) => {
    const result = await Notification.find({user: req.params.id})
        .populate("user").populate("question").sort({"datetime": -1});
    try {
        res.send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const result = await Notification.findByIdAndUpdate(req.params.id, req.body);
        if (result) {
            res.send({message: 'Success'});
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;