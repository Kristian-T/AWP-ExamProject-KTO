import React, { useState } from "react";

function Answer(props) {
    const [answers, setAnswer] = useState("");
    return <>
        <input onChange={(event) => setAnswer(event.target.value)} type="text" placeholder="Answer" />
        <button type="button" onClick={(event) => props.answer(answers, props.id)}>Post</button>
    </>
}

export default Answer;
