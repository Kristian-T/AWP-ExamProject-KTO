import React from 'react';
import Answer from './Answer';

function Question(props) {
    const id = props.id;
    const question = props.getQuestion(id);

    let answers = question.answers.map((element) => {
        return (
            <li key={element._id}>
                <div>
                    <h1>{element.answer}</h1>
                    <p>Votes: {element.vote}</p>
                    <button className="VoteBTN" onClick={(event) => props.voting(id, element._id)}>
                        +
                    </button>
                </div>
            </li>
        );
    });

    return (
        <>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <h1>Answers</h1>
            {<ul>{answers}</ul>}
            <Answer
                id={question.ID}
                posting={props.posting}
            ></Answer>
        </>
    );
}

export default Question;
