const mongoose = require('mongoose')

// This is the Schema of the data i am working with
// This necessary to make sure the data will be consistent in the database
const QuestionSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    answers: [{description: String, votes: Number}]
})

module.exports = mongoose.model('Post', QuestionSchema);
