import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import RelatedItems from './relatedItems.jsx';
import BoughtTogether from './boughtTogether.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentListing: 2,
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
      ((this.state.currentPage + 1) * this.state.currentMax)) === 0 ||
      (this.state.currentItems.length /
      ((this.state.currentPage + 1) * this.state.currentMax))===1) {
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
      if (this.state.currentItems.length / ( temp * this.state.currentMax) === 1) {
        temp--;
      }
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
    Axios.get("/listing/" + this.state.currentListing).then((response) => {
      this.setState({
        currentItems: response.data,
        currentMax: Math.floor((window.innerWidth - 130) / 175)
      });
    }).catch((err) => console.log(err))
  }
  
  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <div id = "boughtTogetherBody"> 
        <div className = "btHead">Frequently bought together</div><div> 
          <BoughtTogether currentListing = {this.state.currentListing}></BoughtTogether>
        </div>
        <div className = "boughtTogetherSeperator"></div>
      <div className = "relHead">Customers who bought this item also bought</div><div> 
          <RelatedItems
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          list={this.state.currentItems.slice
            (this.state.currentPage * this.state.currentMax, 
              this.state.currentPage * this.state.currentMax + this.state.currentMax)} />
      </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
