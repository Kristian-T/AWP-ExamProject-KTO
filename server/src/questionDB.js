module.exports = (mongoose) => {

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

    async function createQuestion(t, d) {
        let question = new questionModel({title: t, description: d});
        return question.save();
    }

    async function bootstrap(count = 10) {
        let l = (await getQuestionList()).length;
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
