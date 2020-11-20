import React, { useState } from "react";

function Answer(props) {
    const [answer, setAnswer] = useState("");

    return <>
        <input onChange={(event) => setAnswer(event.target.value)} type="text" placeholder="Question" />
        <button type="button" onClick={(event) => props.posting(answer, props.id)}>Post</button>
    </>
}

export default Answer;
