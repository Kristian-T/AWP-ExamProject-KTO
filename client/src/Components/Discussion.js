import React, {useState} from 'react';
import Comment from './Comment';

function Discussion(props) {
    const id = props.id;
    const discussion = props.getDiscFunc(id);

    let comments = discussion.comments.map((element) => {
        return (
            <li key={element._id}>
                <div>
                    <h2>{element.commentText} [{element.commentDate}]</h2>
                    <p>Votes: {element.commentVotes}</p>
                    <button onClick={(event) => props.commentVote(id, element._id)}>Vote</button>
                </div>
            </li>
        );
    });

    return (
        <>
            <div>
                <h1>{discussion.postTitle}</h1>
                <p>{discussion.topicName}</p>
                <h1>Comments</h1>
                {<ul>{comments}</ul>}
            </div>
            <Comment
                id={discussion.ID}
                comment={props.comment}
            ></Comment>
        </>
    );
}

export default Discussion;
