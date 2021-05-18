import React, {useState} from 'react';
import Answer from './Answer';

function Question(props) {
    const id = props.id;
    const question = props.getQ(id);

        let answers = question.answers.map((element) => {
            return (
                <li key={element._id}>
                    <div>
                        <h2>{element.answer}</h2>
                        <p>Votes: {element.votes}</p>
                        <button onClick={(event) => props.voteq(id, element._id)}>Vote</button>
                    </div>
                </li>
            );
        });

        return (
            <>
                <div>
                    <h1>{question.title}</h1>
                    <p>{question.description}</p>
                    <h1>Answers</h1>
                    {<ul>{answers}</ul>}
                </div>
                <Answer
                    id={question.ID}
                    answer={props.answer}
                ></Answer>
            </>
        );
}

export default Question;
