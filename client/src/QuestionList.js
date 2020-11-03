import React from 'react';
import {Link} from "@reach/router";

import AddQuestion from "./AddQuestion";

function QuestionList(props) {
    let questionList = props.questionList;
    const filter = props.filter;

    console.log("filter", filter);

    const mapFunction = element =>
        <Link to={`/question/${element.id}`} key={element.id}>
            <li>{element.title}</li>
        </Link>;

    const list = questionList.map(mapFunction);

    return (
        <>
            <h3>Questions</h3>
            <ul>
                {list}
            </ul>

            <AddQuestion addQuestion={props.addQuestion}></AddQuestion>
        </>
    );
}

export default QuestionList;
