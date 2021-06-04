import React, {useState, useEffect} from 'react';

function Login(props) {
    const{login} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit() {
        login(username, password);
    }

    return (
        <>
            <h3>Login</h3>

            <input onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" />
            <input onChange={(event) => setPassword(event.target.value)} type="text" placeholder="Password"/>

            <button type="button" onClick={(event) => onSubmit()}>
                Submit
            </button>
        </>
    );
}

export default Login;
