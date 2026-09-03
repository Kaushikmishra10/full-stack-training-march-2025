import { useState, useReducer } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state < 10 ? state + 1 : state;

    case "DECREMENT":
      return state > 0 ? state - 1 : state;

    default:
      return state;
  }
}

function Counter() {
  const [stateCount, setStateCount] = useState(0);

  const [reducerCount, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h1>Counter using useState & useReducer</h1>

      <h2>useState Counter: {stateCount}</h2>
      <button
        onClick={() => stateCount > 0 && setStateCount(stateCount - 1)}
        disabled={stateCount === 0}
      >
        Decrement
      </button>
      <button
        onClick={() => stateCount < 10 && setStateCount(stateCount + 1)}
        disabled={stateCount === 10}
      >
        Increment
      </button>

      <h2>useReducer Counter: {reducerCount}</h2>
      <button onClick={() => dispatch({ type: "DECREMENT" })}
        disabled={reducerCount === 0}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}
        disabled={reducerCount === 10}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
