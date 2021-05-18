import React from 'react';
import {Link} from "@reach/router";

import AddQuestion from "./AddQuestion";

function QuestionList(props) {
    const questionList = props.qList;


    const mapFunction = (element) => (
        <Link key={element.ID} to={`/question/${element.ID}`}>
            <div> <p>{element.title}</p> </div>
        </Link>
);

    let list;
    if (questionList !== undefined) {
        list = questionList.map(mapFunction);
    }


    return (
    <>
        <p>Questionsss: </p>
        <div className="RootDiv">{list}</div>
       <AddQuestion addQuestion={props.addQuestion}></AddQuestion>
    </>
);
}

export default QuestionList;
