const mongoose = require("mongoose");
const questionSchema = require("./QuestionSchema");

exports.getQuestions = (req, res) => {
    questionSchema.find()
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                Post: docs.map((doc) => {
                    return {
                        ID: doc.id,
                        title: doc.title,
                        description: doc.description,
                        answers: doc.answers,
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        });
};

exports.postQuestion = (req, res) => {
    console.log("POSTING: " + req.body)
    const Post = new questionSchema({
        id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        answers: req.body.answers
    });
    return Post.save()
        .then((result) => {
            res.status(201).json({
                result: {
                    ID: result.id,
                    Post: result,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

exports.postAnswer = (req, res) => {
    const questionId = req.params.id;

    questionSchema.findOne({ id: questionId })
        .exec()
        .then((doc) => {
            let newAnswer = {
                answer: req.body.answer,
                votes: 0,
            };
            doc.answers.push(newAnswer);
            doc.answersCount += 1;
            return doc
                .save()
                .then((result) => {
                    res.status(201).json({
                        response: result,
                        questionId: questionId,
                    });
                })
        })

};

exports.answerVote = (req, res) => {
    const id = req.params.question_id;
    questionSchema.findOne({ id: id })
        .exec()
        .then((doc) => {
            let targetAnswer = doc.answers.find((elem) => elem._id == req.body.ID);
            let indexOfTargetAnswer = doc.answers.indexOf(targetAnswer);
            targetAnswer.votes += 1;

            doc.answers.splice(indexOfTargetAnswer, 1);
            doc.answers.splice(indexOfTargetAnswer, 0, targetAnswer);

            doc
                .save()
                .then((result) => {
                    res.status(201).json({
                        message: "Votes updated",
                    });
                })
        })
};

exports.getQuestionByID = (req, res) => {
    const id = req.params.question_id;
    questionSchema.findOne({ id: id })
        .select("ID title description answer")
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json({
                    doc,
                });
            } else {
                res.status(404).json({ err: "Category not found at specified ID" });
            }
        })
};





