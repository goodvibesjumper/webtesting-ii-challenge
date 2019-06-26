import React from "react";
import "./App.css";
import Display from "./components/Display";
import Dashboard from "./components/Dashboard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balls: 0,
      strikes: 0,
      fouls: 0,
      hits: 0
    };
  }

  incrementBalls = () => {
    if (this.state.balls < 3) {
      this.setState({ ...this.state, balls: this.state.balls + 1 });
    } else {
      this.setState({
        balls: 0,
        strikes: 0,
        fouls: 0
      });
    }
  };

  incrementStrikes = () => {
    if (this.state.strikes < 2) {
      this.setState({
        ...this.state,
        strikes: this.state.strikes + 1
      });
    } else {
      this.setState({
        balls: 0,
        strikes: 0,
        fouls: 0
      });
    }
  };

  incrementHits = () => {
    this.setState({
      balls: 0,
      strikes: 0,
      fouls: 0,
      hits: this.state.hits + 1
    });
  };

  incrementFouls = () => {
    if (this.state.strikes < 2) {
      this.setState({
        // ...this.state,
        strikes: this.state.strikes + 1
      });
    } else {
      this.setState({
        // ...this.state
      });
    }
    this.setState({ fouls: this.state.fouls + 1 });
  };

  render() {
    return (
      <div className="App">
        <Display
          balls={this.state.balls}
          strikes={this.state.strikes}
          fouls={this.state.fouls}
          hits={this.state.hits}
        />
        <Dashboard
          incrementBalls={this.incrementBalls}
          incrementStrikes={this.incrementStrikes}
          incrementFouls={this.incrementFouls}
          incrementHits={this.incrementHits}
        />
      </div>
    );
  }
}

export default App;
