import React, { Component } from "react";

// sets up the HOC
function withCount(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        count: 0,
      };
    }

    incrementCount = () => {
      this.setState({
        count: this.state.count + 1,
      });
    };

    decrementCount = () => {
      this.setState({
        count: this.state.count - 1,
      });
    };

    componentDidMount() {
      console.log("Mounted");
      console.log(this.state.count);
    }

    componentDidUpdate() {
      console.log("Updated");
    }

    render() {
      return (
        <Component
          count={this.state.count}
          plus={this.incrementCount}
          minus={this.decrementCount}
          {...this.props}
        />
      );
    }
  }; // Current question: Which lines are required for the increment to work
}

// Component such that we can add in the state above
class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1> Welcome</h1>
        Count: {this.props.count} <button onClick={this.props.plus}>+</button>{" "}
        <button onClick={this.props.minus}>-</button>
      </div>
    );
  }
}
const WithCount = withCount(MyComponent);

export default WithCount;
// withCount is the higher order component, it takes a component as an argument - MyComponent, withCount returns a new component that contains a count state along with lifecycle console.logs.
// We can use the withCount Component just by importing it and using it within our application
