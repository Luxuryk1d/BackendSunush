const router = require("express").Router();
const Category = require("../models/Category");
const Question = require("../models/Question");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch {
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await Category.findById(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", [auth, permit("admin")], async (req, res) => {
    const categoryData = req.body;
    const category = new Category(categoryData);
    try {
        await category.save();
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', [auth, permit("admin")], async (req, res) => {
    const newCategory = await Category.findOne({rusTitle: "Другое"});
    const categoryQuestions = await Question.find({category: req.params.id});
    for (let i = 0; i < categoryQuestions.length; i++) {
        await Question.findByIdAndUpdate(categoryQuestions[i]._id, {category: newCategory._id});
    }
    const result = await Category.findByIdAndRemove({_id: req.params.id});
    if (result) {
        res.send("Category removed");
    } else {
        res.sendStatus(404);
    }
});

router.put("/:id", [auth, permit("admin")], async (req, res) => {
    try {
        await Category.findOneAndUpdate({_id: req.params.id}, req.body);
        res.send({message: 'Category updated'});
    } catch (e){
        res.status(400).send(e);
    }
})

module.exports = router;