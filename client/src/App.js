import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import QuestionList from './QuestionList';
import Question from './Question';
import AddQuestion from './AddQuestion';

const API_URL = process.env.REACT_APP_API;

function App() {
    const [questionList, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${API_URL}/ql`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestion(data.Post);
        }
        fetchData();
    }, []);

    function getQuestion(id) {
        let q = questionList.find((element) => element.id == id);
        return q;
    }

    async function answer(answer, qId){
        const url = `${API_URL}/questions/answer/${qId}`;
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

    async function addQuestion(title, description) {
        console.log(title, description);
        const url = `${API_URL}/ql`;

        const newQuestion = {
            title: title,
            description: description,
        }

        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
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
                    <QuestionList path="/" qList={questionList} addQuestion={addQuestion}/>
                    <Question path="/question/:id" getQuestion={getQuestion} answ={answer}/>
                </Router>
            </>
    );
    console.log("Questions______________________________________________________________:"+questionList)
}

export default App;
