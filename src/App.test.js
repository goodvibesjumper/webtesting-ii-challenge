import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  render,
  fireEvent,
  queryByAltText,
  queryByText,
  getByTitle
} from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

import Display from "./components/Display";
import Dashboard from "./components/Dashboard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("The App Component", () => {
  const app = render(<App />);
  const display = render(<Display />);
  const dashboard = render(<Dashboard />);

  it("exists", () => {
    expect(app).toBeTruthy();
  });

  it("contains both sub-components", () => {
    expect(display).toBeTruthy();
    expect(dashboard).toBeTruthy();
  });


  describe("Buttons and Counters Tests", () => {

    // Rule1 : balls and strieks reset to 0 when a player reaches 3 strikes or 4 balls (part 1)
    test ("Rule 1 part 1 : ball counter reset after 4 balls (ballButton press x 4) ", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const ballCount = getByTitle("ballCount")
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("1");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("2");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("3");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("0");
    })
    

    // Rule1 : balls and strieks reset to 0 when a player reaches 3 strikes or 4 balls (part 2)
    test ("Rule 1 part 2 : strike counter reset after 4 balls (strike x 1, balls x 4)", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const strikeButton = getByTitle("strikeButton")
      const ballCount = getByTitle("ballCount")
      const strikeCount = getByTitle("strikeCount")

      fireEvent.click(strikeButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("1");

      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("1");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("2");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("3");
      fireEvent.click(ballButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("0");
    })


    // Rule2 : balls and strikes reset to 0 when a hit is recorded
    test ("Rule 2 : strike button / ball counter", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const strikeButton = getByTitle("strikeButton")
      const hitButton = getByTitle("hitButton")
      
      const ballCount = getByTitle("ballCount")
      const strikeCount = getByTitle("strikeCount")
    

      fireEvent.click(ballButton);
      fireEvent.click(strikeButton);
      expect(ballCount).toHaveTextContent("1");
      expect(strikeCount).toHaveTextContent("1");

      fireEvent.click(hitButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("0");
    })

    // Rule3 : A foul increases strikes up to 2.  
    //         Part 1 - With no strikes, a foul make it 1 strike.
    //         Part 2 - With 1 strike, a foul makes it 2 strikes.
    //         Part 3 - With 2 strikes, a foul has no effect, count stays at 2 strikes.
  
    test ("Rule 3 Part 1", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const strikeButton = getByTitle("strikeButton")
      const hitButton = getByTitle("hitButton")
      const foulButton = getByTitle("foulButton")

      const ballCount = getByTitle("ballCount")
      const strikeCount = getByTitle("strikeCount")
      const foulCount = getByTitle("foulCount")
      const hitCount = getByTitle("hitCount")

      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("0");
      expect(foulCount).toHaveTextContent("0");
      expect(hitCount).toHaveTextContent("0");

      // 0 strikes, a foul makes 1 strike
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("1");
      expect(foulCount).toHaveTextContent("1");
      expect(hitCount).toHaveTextContent("0");

      // 0 strikes, a second foul makes 2 strikes
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("2");
      expect(foulCount).toHaveTextContent("2");
      expect(hitCount).toHaveTextContent("0");

      // 0 strikes, a third foul retains 2 strikes
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("2");
      expect(foulCount).toHaveTextContent("3");
      expect(hitCount).toHaveTextContent("0");

    })

    // Rule3 : A foul increases strikes up to 2.  
    //         Part 1 - With no strikes, a foul make it 1 strike.
    //         Part 2 - With 1 strike, a foul makes it 2 strikes.
    //         Part 3 - With 2 strikes, a foul has no effect, count stays at 2 strikes.
  
    test ("Rule 3 Part 2", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const strikeButton = getByTitle("strikeButton")
      const hitButton = getByTitle("hitButton")
      const foulButton = getByTitle("foulButton")

      const ballCount = getByTitle("ballCount")
      const strikeCount = getByTitle("strikeCount")
      const foulCount = getByTitle("foulCount")
      const hitCount = getByTitle("hitCount")

      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("0");
      expect(foulCount).toHaveTextContent("0");
      expect(hitCount).toHaveTextContent("0");

      // 1 strikes, a foul makes 2 strike
      fireEvent.click(strikeButton);
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("2");
      expect(foulCount).toHaveTextContent("1");
      expect(hitCount).toHaveTextContent("0");

      // Additional foul shouldn't increase strike count
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("2");
      expect(foulCount).toHaveTextContent("2");
      expect(hitCount).toHaveTextContent("0");
    })

    // Rule3 : A foul increases strikes up to 2.  
    //         Part 1 - With no strikes, a foul make it 1 strike.
    //         Part 2 - With 1 strike, a foul makes it 2 strikes.
    //         Part 3 - With 2 strikes, a foul has no effect, count stays at 2 strikes.
  
    test ("Rule 3 Part 3", () => {
      const { getByTitle } = render(<App />)
      const ballButton = getByTitle("ballButton")
      const strikeButton = getByTitle("strikeButton")
      const hitButton = getByTitle("hitButton")
      const foulButton = getByTitle("foulButton")

      const ballCount = getByTitle("ballCount")
      const strikeCount = getByTitle("strikeCount")
      const foulCount = getByTitle("foulCount")
      const hitCount = getByTitle("hitCount")

      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("0");
      expect(foulCount).toHaveTextContent("0");
      expect(hitCount).toHaveTextContent("0");

      fireEvent.click(strikeButton);
      fireEvent.click(strikeButton);
      fireEvent.click(foulButton);
      expect(ballCount).toHaveTextContent("0");
      expect(strikeCount).toHaveTextContent("2");
      expect(foulCount).toHaveTextContent("1");
      expect(hitCount).toHaveTextContent("0");
    })
  })
});
