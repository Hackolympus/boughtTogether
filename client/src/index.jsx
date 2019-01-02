import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import RelatedItems from './relatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentItems: [],
      currentPage: 0,
      currentMax: 5
    }
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  nextPage() {
    if (Math.floor(this.state.currentItems.length /
      ((this.state.currentPage + 1) * this.state.currentMax)) === 0) {
      this.setState({
        currentPage: 0
      });
    } else {
      let temp = this.state.currentPage + 1;
      this.setState({
        currentPage: temp
      })
    }
  }
  prevPage() {
    if (this.state.currentPage === 0) {
      let temp = Math.floor(this.state.currentItems.length / this.state.currentMax);
      this.setState({
        currentPage: temp
      })
    } else {
      let temp = this.state.currentPage - 1;
      this.setState({
        currentPage: temp
      })
    }
  }

  loadData() {
    Axios.get("/listing/1").then((response) => {
      this.setState({
        currentItems: response.data,
        currentMax: Math.floor((window.innerWidth - 150) / 175)
      });
    }).catch((err) => console.log(err))
  }
  
  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <div>Customers who bought this item also bought
          <RelatedItems
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          list={this.state.currentItems.slice
            (this.state.currentPage * this.state.currentMax, 
              this.state.currentPage * this.state.currentMax + this.state.currentMax)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
