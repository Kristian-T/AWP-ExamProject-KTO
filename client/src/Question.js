import React from 'react';
import Answer from './Answer';

function Question(props) {
    const id = props.id;
    const question = props.getQ(id);

    let answers = question.answers.map((element) => {
        return (
            <li key={element._id}>
                <div>
                    <h1>{element.description}</h1>
                    <p>Votes: {element.votes}</p>
                </div>
            </li>
        );
    });

    return (
        <>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <h1>Answers</h1>
            {<ul>{}</ul>}
            <Answer
                id={question.ID}
                answer={props.answ}
            ></Answer>
        </>
    );
}

export default Question;
