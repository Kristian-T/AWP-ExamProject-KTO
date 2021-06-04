import React, {useState} from 'react';

function Menu(props) {
    //const [postTitle, setPostTitle] = useState("");
    //const [topicName, setTopicName] = useState("");

    return (
        <>
            <h3>Topic Menu</h3>
            <button type="button">All Topics</button>
            <button onClick="myFunction()">Tech</button>
            <button onClick="myFunction()">Movies</button>
            <button onClick="myFunction()">Music</button>
            <button onClick="myFunction()">Books</button>
        </>
    );
}

export default Menu;
