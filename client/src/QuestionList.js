import React from 'react';
import {Link} from "@reach/router";

import AddQuestion from "./AddQuestion";

function QuestionList(props) {
    const qList = props.qList;


    const mapFunction = (element) => (
        <Link className="QuestionLink" key={element.ID} to={`/question/${element.ID}`}>
            <p className="QuestionTitle">{element.title}</p>
            <p>Answers:</p>
        </Link>
);

    let list;
    if (qList !== undefined) {
        list = qList.map(mapFunction);
    }


    return (
    <>
        <p>Questions: </p>
        <div className="RootDiv">{list}</div>
       <AddQuestion addQuestion={props.addQuestion}></AddQuestion>
    </>
);
}

export default QuestionList;
