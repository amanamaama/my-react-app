import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;