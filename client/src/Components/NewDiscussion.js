import React, {useState, useEffect} from 'react';

function NewDiscussion(props) {
    const [postTitle, setPostTitle] = useState("");
    const [topicName, setTopicName] = useState("");

    return (
        <>
            <h3>New Discussion</h3>

            <input onChange={(event) => setPostTitle(event.target.value)} type="text" placeholder="Title" />
            <input onChange={(event) => setTopicName(event.target.value)} type="text" placeholder="Topic"/>

            <button type="button" onClick={(event) => props.newDiscussionFunc(postTitle, topicName)}>
                Submit
            </button>
        </>
    );
}

export default NewDiscussion;
