const router = require("express").Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Answer = require("../models/Answer");
const User = require("../models/User");
const Question = require("../models/Question");

router.get('/:id', async (req, res) => {
    try {
        const answers = await Answer.find({question: req.params.id});
        res.send(answers);
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", [auth, permit("admin", "moderator")], async (req, res) => {
    const answerData = req.body;
  
    try {
      const question = await Question.findById(req.body.question);
      if (!question) {
        return res.status(404).send("Question not found");
      }
  
      question.answers += 1;
  
      await question.save();
  
      answerData.user = "Администрация";
      answerData.question = req.body.question;
  
      const answer = new Answer(answerData);
      await answer.save();
  
      res.send(answer);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  

router.delete('/:id', [auth, permit("admin", "moderator")], async (req, res) => {
    const result = await Answer.findByIdAndRemove(req.params.id);

    if (result) {
        res.send("Answer removed");
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;