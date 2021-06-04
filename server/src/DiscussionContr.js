const mongoose = require("mongoose");
const discussionSchema = require("./DiscussionSchema");

exports.getDiscussions = (req, res) => {
    discussionSchema.find()
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                Post: docs.map((doc) => {
                    return {
                        ID: doc.id,
                        postTitle: doc.postTitle,
                        topicName: doc.topicName,
                        date: doc.date,
                        comments: doc.comments,
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

exports.postDiscussion = (req, res) => {
    console.log("POSTING: " + req.body)
    const Post = new discussionSchema({
        id: new mongoose.Types.ObjectId(),
        postTitle: req.body.postTitle,
        topicName: req.body.topicName,
        date: Date.now(),
        comments: req.body.comments,
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


exports.getDiscussionByID = (req, res) => {
    const id = req.params.discussion_id;
    discussionSchema.findOne({ id: id })
        .select("ID postTitle topicName date comment")
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

exports.postComment = (req, res) => {
    const discussionId = req.params.id;

    discussionSchema.findOne({ id: discussionId })
        .exec()
        .then((doc) => {
            let newComment = {
                commentText: req.body.comment,
                commentVotes: 0,
                commentDate: Date.now(),
            };
            doc.comments.push(newComment);
            doc.commentsCount += 1;
            return doc
                .save()
                .then((result) => {
                    res.status(201).json({
                        response: result,
                        discussionId: discussionId,
                    });
                })
        })

};

exports.commentVote = (req, res) => {
    const id = req.params.discussion_id;
    discussionSchema.findOne({ id: id })
        .exec()
        .then((doc) => {
            let targetComment = doc.comments.find((elem) => elem._id == req.body.ID);
            let indexOfTargetComment = doc.comments.indexOf(targetComment);
            targetComment.commentVotes += 1;

            doc.comments.splice(indexOfTargetComment, 1);
            doc.comments.splice(indexOfTargetComment, 0, targetComment);

            doc
                .save()
                .then((result) => {
                    res.status(201).json({
                        message: "Votes updated",
                    });
                })
        })
};



