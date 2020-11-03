module.exports = (mongoose) => {
    const questionSchema = new mongoose.Schema({
        name: String
    });

    const questionModel = mongoose.model('question', questionSchema);

    async function getQuestionList() {
        try {
            return await questionModel.find();
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async function getQuestion(id) {
        try {
            return await questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async function createQuestion(text) {
        let question = new questionModel({name: text});
        return question.save();
    }

    async function bootstrap(count = 10) {
        let l = (await getQuestion()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];
            for (let i = 0; i < count; i++) {
                let newQuestion = new questionModel({name: `question number ${i}`});
                promises.push(newQuestion.save());
            }
            return Promise.all(promises);
        }
    }

    return {
        getQuestionList,
        getQuestion,
        createQuestion,
        bootstrap
    }
}
