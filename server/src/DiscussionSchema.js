const mongoose = require('mongoose')

const DiscussionSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    postTitle: String,
    topicName: String,
    date: Date,
    comments: [{commentText: String, commentVotes: Number, commentDate: Date}]
})

module.exports = mongoose.model('Post', DiscussionSchema);
