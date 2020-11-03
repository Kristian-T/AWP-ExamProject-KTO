module.exports = (questionDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get("/", async (request, response) => {
    const questionList = await questionDB.getQuestionList();
    response.json(questionList);
  });

  router.get("/question/:id", async (request, response) => {
    const question = await questionDB.getQuestionList(req.params.id);
    response.json(question);
  });

  router.post("/questionList", (request, response) => {
    console.log(request.body);
    response.json({ msg: "Question added!" });
  });

  return router;
}
