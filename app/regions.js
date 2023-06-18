const router = require("express").Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Region = require("../models/Region");

router.get("/", async (req, res) => {
    try {
        const region = await Region.find();
        res.send(region);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/:id", async (req, res) => {
    const result = await Region.findById(req.params.id);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", [auth, permit("admin", "moderator")], async (req, res) => {
    const regionData = req.body;
    const region = new Region(regionData);
    try {
        await region.save();
        res.send(region);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', [auth, permit("admin", "moderator")], async (req, res) => {
    const result = await Region.findByIdAndRemove({_id: req.params.id});
    if (result) {
        res.send("Region removed");
    } else {
        res.sendStatus(404);
    }
});

router.patch('/:id', [auth, permit("admin", "moderator")], async (req, res) => {
    const result = await Region.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
        res.send('Success');
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;