import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import RelatedItems from './relatedItems';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        currentItems : []
    }
  }

  componentDidMount() {
    axios.get("localhost:3015/listing/1", () => {
    }).then((response) => {
        this.setState({
            currentItem : response
        });
    })
  }
  render() {
    return (
      <div>
        eatshit
        <RelatedItems list = {this.state.currentItems} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
