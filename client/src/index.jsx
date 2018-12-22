import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import RelatedItems from './relatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentItems: []
    }
  }

  componentDidMount() {
    axios.get("/listing/1").then((response) => {
      this.setState({
        currentItems: response.data
      });
    }).catch((err) => console.log(err))
  }
  render() {
    return (
      <div>Customers who bought this item also bought

      <div>
          <RelatedItems list={this.state.currentItems} />
        </div></div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
