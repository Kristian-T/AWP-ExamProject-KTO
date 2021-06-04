import React from 'react';
import {Link} from "@reach/router";

import NewDiscussion from "./NewDiscussion";
import Menu from "./Menu"

function DiscussionList(props) {
    const discussionList = props.discList;
    const sortedDiscList = discussionList.sort((a,b)=>a.date - b.date)

    const mapAllTopics = (element) => (
        <Link key={element.ID} to={`/discussion/${element.ID}`}>
            <div>
                <p>{element.postTitle} [{element.date}]</p>
            </div>
        </Link>
    );

    let list;
    if (sortedDiscList !== undefined) {
        list = sortedDiscList.map(mapAllTopics);
    }

    function recentDiscussions(content) {

    }


    return (
        <>
            <h1>Front Page</h1>

            <h3>Topic Menu</h3>
            <button type="button">All Topics</button>
            <button onClick="myFunction()">Tech</button>
            <button onClick="myFunction()">Movies</button>
            <button onClick="myFunction()">Music</button>
            <button onClick="myFunction()">Books</button>

            <div className="RootDiv">{list}</div>
        </>
    );
}

export default DiscussionList;
