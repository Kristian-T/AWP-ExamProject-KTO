import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import QuestionList from './QuestionList';
import Question from './Question';
import AddQuestion from './AddQuestion';

const API_URL = process.env.REACT_APP_API;

function App() {
    const [questionList, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [voteCount, setVoteCount] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = `${API_URL}/ql`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestion(data.Post);
        };
        fetchData();
    }, [answers, voteCount]);

    function getQuestion(id) {
        if (questionList) {
            let localQuestionList = questionList;
            let q = localQuestionList.find((element) => element.ID == id);
            return q;
        }
    }

    async function voteOnAnswer(question_id, answer_id){

        const url = `${API_URL}/ql/vote/${question_id}`;
        const targetAnswer = {
            ID: answer_id
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(targetAnswer),
        });
        const data = await response.json();

        setVoteCount([...voteCount,data])

    }

    async function answer(answer, questionId){
        const url = `${API_URL}/ql/answer/${questionId}`;
        const newQuestion = {
            answer: answer
        }

        const response = await fetch(url, {
            method: "PATCH", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
        });
        const data = await response.json();
        setAnswer([...answers, data])
    }

    async function addNewQuestion(title, description) {
        console.log(title, description);
        const url = `${API_URL}/ql`;

        const newQuestion = {
            title: title,
            description: description,
            answers: [],
        };

        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
        });
        const data = await response.json();
        console.log("Add Question: "+data)
        setQuestion([...questionList, data.result.Post])
    }
        return (
            <>
                <h1>Question App</h1>

                <Router>
                    <QuestionList path="/" qList={questionList} addQuestion={addNewQuestion}></QuestionList>
                    <Question path="/question/:id" getQ={getQuestion} answer={answer} voteq={voteOnAnswer}></Question>
                </Router>
            </>
    );

}

export default App;
