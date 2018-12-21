import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    axios.get("localhost:3015/listing/1", () => {});
  }
  render() {
    return (
      <div>
        eatshit
        <Items />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
