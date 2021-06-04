import React, { useState } from "react";

function Comment(props) {
    const [comments, setComment] = useState("");
    return <>
        <input onChange={(event) => setComment(event.target.value)} type="text" placeholder="Comment" />
        <button type="button" onClick={(event) => props.comment(comments, props.id)}>Post</button>
    </>
}

export default Comment;
