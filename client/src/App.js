import React, {useEffect, useState} from 'react';
import {Link, Router} from "@reach/router";
import Discussion from "./Components/Discussion";
import DiscussionList from "./Components/DiscussionList";
import NewDiscussion from "./Components/NewDiscussion";
import Login from "./Components/Login";
import AuthService from "./AuthService";

const API_URL = process.env.REACT_APP_API;

const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
    const [discussionList, setDiscussion] = useState([]);
    const [comments, setComment] = useState([]);
    const [voteCount, setVoteCount] = useState([]);
    const [discCount, setDiscCount] = useState(0);

    useEffect(() => {
       // const fetchData = async () => {
        async function getData() {
            const url = `${API_URL}/disclist`;
            //const response = await fetch(url);
            const response = await authService.fetch(url);
            const data = await response.json();
            setDiscussion(data.Post);
        };
        //fetchData();
        getData();
    }, [comments, voteCount, discCount]);


    async function addNewDiscussion(postTitle, topicName) {
        console.log(postTitle, topicName);
        const url = `${API_URL}/disclist`;

        const newDiscussion = {
            postTitle: postTitle,
            topicName: topicName,
            comments: [],
        };

        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDiscussion),
        });
        const data = await response.json();
        console.log("Add Discussion: "+data)
        setDiscussion([...discussionList, data.result.Post])
    }

    function getDiscussion(id) {
        if (discussionList) {
            let localDiscussionList = discussionList;
            let d = localDiscussionList.find((element) => element.ID == id);
            return d;
        }
    }

    async function comment(comment, discussionId){
        const url = `${API_URL}/disclist/comment/${discussionId}`;
        const newDiscussion = {
            comment: comment
        }

        const response = await fetch(url, {
            method: "PATCH", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDiscussion),
        });
        const data = await response.json();
        setComment([...comments, data])
    }

    async function voteOnComment(discussion_id, comment_id){

        const url = `${API_URL}/disclist/vote/${discussion_id}`;
        const targetComment = {
            ID: comment_id
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(targetComment),
        });
        const data = await response.json();

        setVoteCount([...voteCount,data])

    }

    async function authenticateLogin(username, password){
        try {
            const resp = await authService.login(username, password);
            console.log("Authentication:", resp.msg);
            setDiscCount(p => p + 1);
        } catch (e) {
            console.log("Login", e);
        }
    }

    /*
  useEffect(() => {
    if (!authService.loggedIn()) {
      login("ktoft", "123").then(() => {
        setPostCount(p => p + 1); // Refresh data after login
      })
    }
  }, []); // Only try login at first page render
  */

/*
    let loginPart = <Login login={authenticateLogin()}></Login>;
    if (authService.loggedIn()) {
        loginPart = "Logged in!";
    }
    */

    return (
        <>
            <div>
            <Link to={`/login`}>
                Login
            </Link>
            </div>
            <div>
            <Link to={`/`}>
                Front Page
            </Link>
            </div>
                <div>
            <Link to={`/newDiscussion`}>
                Add New Discussion
            </Link>
                </div>

            <Router>
                <Login path="/login" loginFunc={authenticateLogin}></Login>
                <NewDiscussion path="/newDiscussion" newDiscussionFunc={addNewDiscussion}></NewDiscussion>
                <DiscussionList path="/" discList={discussionList}></DiscussionList>
                <Discussion path="/discussion/:id" getDiscFunc={getDiscussion} comment={comment} commentVote={voteOnComment}></Discussion>
            </Router>
        </>
    );

}

export default App;
