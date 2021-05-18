
  const express = require("express");
  const router = express.Router();
  const QuestionContr = require("./QuestionContr")

  /**** Routes ****/
  router.get('/', QuestionContr.getQuestions);
  router.post('/', QuestionContr.postQuestion);
  router.patch('/answer/:id', QuestionContr.postAnswer);
  router.post('/vote/:question_id', QuestionContr.answerVote)
  router.get('/:question_id', QuestionContr.getQuestionByID);

  module.exports = router;
