import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import QuestionList from './QuestionList';
import Question from './Question';
import AddQuestion from "./AddQuestion";

const API_URL = process.env.REACT_APP_API;

function App() {
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${API_URL}`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestionList(data);
        }
        fetchData();
    }, []);

    function getQuestion(id) {
        const question = questionList.find(element => element.id === parseInt(id));
        return question;
    }

    async function addQuestion(title, description) {
        console.log(title, description);

        const newQuestion = {
            title: title,
            description: description,
            cooking_time: 60
        }

        const url = "http://localhost:8080/api/";
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestion),
        });
        const data = await response.json();
        console.log(data);
    }

        return (
            <>
                <h1>Question App</h1>

                <Router>
                    <QuestionList path="/ql" questionList={questionList} addQuestion={addQuestion}/>
                    <QuestionList path="/questionList/with/:filter" questionList={questionList} addQuestion={addQuestion}/>
                    <Question path="/question/:id" getQuestion={getQuestion}/>
                </Router>
            </>
    );
}

export default App;
