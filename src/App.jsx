import Profile from "./Profile";
import Counter from "./Counter";
import Skills from "./Skills";

function App() {
  return (
    <div>
      <h1>Hello, I am Aman!</h1>
      <Profile name="Aman" topic="React" />
      <Counter />
      <Skills />
    </div>
  );
}

export default App;