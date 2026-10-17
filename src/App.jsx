import { useState } from "react";
import Profile from "./Profile";
import Counter from "./Counter";
import Skills from "./Skills";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <div>
      <h1>Hello, I am Aman!</h1>
      <Profile name="Aman" topic="React" />
      <Counter />
      {loggedIn ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <Login onLogin={function () { setLoggedIn(true); }} />
      )}
      <Skills loggedIn={loggedIn} />
    </div>
  );
}

export default App;