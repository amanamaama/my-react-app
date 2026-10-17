import { useState } from "react";

const API = "https://my-first-api-s0ly.onrender.com";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function send(path) {
    fetch(API + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          props.onLogin();
        } else {
          setMessage(data.message || data.error);
        }
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={function (e) { setUsername(e.target.value); }}
      />{" "}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={function (e) { setPassword(e.target.value); }}
      />{" "}
      <button onClick={function () { send("/login"); }}>Log in</button>
      <button onClick={function () { send("/signup"); }}>Sign up</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;