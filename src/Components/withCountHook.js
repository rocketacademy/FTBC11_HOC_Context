import { useState, useEffect } from "react";

// Wrapper component that adds state
function withCount(Component) {
  return function WithCount(props) {
    // defining the function
    const [count, setCount] = useState(0);

    useEffect(() => {
      // ComponentDidMount
      console.log("Mounted & Updated");

      // ComponentDidUpdate
      console.log(count);

      // What is this last lifecycle method
      return () => {
        console.log("Component unmounting");
      };
    });

    return <Component count={count} {...props} setCount={setCount} />;
  };
}

// Component to be wrapped uses functionality from the wrapper (parent) component
function MyComponent(props) {
  return (
    <div>
      Count: {props.count}
      {/* invoking the function */}
      <button onClick={() => props.setCount(props.count + 1)}>+</button>
      <button onClick={() => props.setCount(props.count - 1)}>-</button>
    </div>
  );
}

const WithCountHook = withCount(MyComponent);

export default WithCountHook;
