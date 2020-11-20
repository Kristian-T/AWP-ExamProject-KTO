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
    const Post = new questionSchema({
        id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
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
                answerDate: Date.now(),
                vote: 0,
            };
            doc.answers.push(newAnswer);
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

exports.getQuestionByID = (req, res) => {
    const id = req.params.question_id;
    questionSchema.findOne({ _id: id })
        .select("ID title content date answersCount answers")
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





