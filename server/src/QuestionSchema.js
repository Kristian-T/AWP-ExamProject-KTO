const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    answers: [{answer: String, votes: Number}]
})

module.exports = mongoose.model('Post', QuestionSchema);
