const router = require("express").Router();
const config = require("../config");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Question = require("../models/Question");
const User = require("../models/User");
const Category = require("../models/Category");
const Answer = require("../models/Answer");
const Region = require("../models/Region");
const {nanoid} = require("nanoid");


router.get("/", async (req, res) => {
    let query = {published: true, deleted: false};
    let options;

    const limit = 6;
    const page = req.query.page;

    options = {
        page: page,
        limit: limit,
        populate: ["user", "category", "region"],
        sort: {datetime: 1},
    };

    if (req.query.category) {
        query = {category: req.query.category, published: true, deleted: false};
    }

    if (page) {
        try {
            const questions = await Question.paginate(query, options);
            res.send(questions);
        } catch (e) {
            res.status(500).send(e);
        }
    }
});


router.get("/:id", async (req, res) => {
    const result = await Question.findOne({_id: req.params.id}).populate("user").populate("category").populate("region");
    res.send(result);
});

router.get("/unpublished/all", [auth, permit("admin", "moderator")], async (req, res) => {
    try {
        const questions = await Question.find({published: false, deleted: false});
        res.send(questions);
    } catch (e) {
        res.sendStatus(404);
    }
});

router.get("/myQuestions/:id", auth, async (req, res) => {
    const questions = await Question.find({
        user: req.params.id,
        deleted: false
    }).populate("user").populate("category").populate("region");
    if (questions) {
        const result = questions.map(async item => {
            const answer = await Answer.find({question: item._id});
            item.answers = answer.length;
            return item;
        });
        const newResult = await Promise.all(result);
        res.send(newResult);
    } else {
        res.sendStatus(404);
    }
});

router.get("/myQuestions/deleted/:id", auth, async (req, res) => {
    const deletedQuestions = await Question.find({
        user: req.params.id,
        deleted: true
    }).populate("user").populate("category").populate("region");
    if (deletedQuestions) {
        const result = deletedQuestions.map(async item => {
            const answer = await Answer.find({question: item._id});
            item.answers = answer.length;
            return item;
        });
        const newResult = await Promise.all(result);
        res.send(newResult);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", [auth, config.upload.array('image', 8)], async (req, res) => {
    const questionData = req.body;
    const token = req.get('Authorization');
    const user = await User.findOne({token});
    const category = await Category.findById(req.body.category);
    const region = await Region.findById(req.body.region);
    const newId = nanoid();

    questionData.datetime = new Date();
    questionData.user = user._id;
    questionData.category = category;
    questionData.region = region;
    questionData.newId = newId;


    if (req.files) {
        questionData.image = req.files;
    }
    const question = new Question(questionData);
    question.publishe();
    try {
        await question.save();
        res.send(question);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/:id', [auth, permit("admin", "moderator")], async (req, res) => {
    const result = await Question.findById(req.params.id);
    result.deleted = true;
    if (result) {
        await result.save();
        res.send("Category removed");
    } else {
        res.sendStatus(404);
    }
});

router.patch('/:id', [auth, permit("admin", "moderator")], async (req, res) => {
    try {
      const result = await Question.findByIdAndUpdate(req.params.id, { published: true });
  
      if (result) {
        res.send({ message: 'Success' });
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  


router.put('/edit/:id', [auth, config.upload.array('newImages', 8)], async (req, res) => {
    let editedQuestion = req.body;
    editedQuestion.image = JSON.parse(editedQuestion.image);
    if (req.files) {
        editedQuestion.image = editedQuestion.image.concat(req.files);
    }
    const result = await Question.findByIdAndUpdate(req.params.id, editedQuestion);
    if (result) {
        try {
            res.send('Success');
        } catch (e) {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(404);
    }
});


router.delete("/delete/:id", auth, async (req, res) => {
    let deletedQuestion = await Question.findById(req.params.id);
    deletedQuestion.deleted = true;
    if (deletedQuestion) {
        await deletedQuestion.save();
        res.send({message: 'Deleted'});
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;