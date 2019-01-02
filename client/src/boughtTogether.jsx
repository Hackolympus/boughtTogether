import React from 'react';
import Axios from "axios";

class BoughtTogether extends React.Component {
    constructor(props) {
        super()
        this.state = {
            totalPrice: "",
            relatedItems: []
        }
    }

    loadData() {
        let sum = 0;
        Axios.get("/related/1").then((response) => {
          response.data.forEach(data => {
              sum += Number(data.price);
          })
          sum = sum + ""
          let total = '$' + sum.slice(0, sum.length - 2) + '.' + sum.slice(sum.length - 2, sum.length)
          this.setState({
              totalPrice: total,
            relatedItems: response.data
          });
        }).catch((err) => console.log(err))
      }
      
      componentDidMount() {
        this.loadData()
      }
    
    render() {
        return (
            <div className = "boughtTogether">
                {this.state.relatedItems.map((item) => {
                   return <div className ="buyTgthrItems" key = {item.id}>
                   <img src = {"http://localhost:3015/bucket/" + item.id} className = "xsThumb"></img>
                   </div>
                })}
                <div className = "totalBox">
                <div>Total price: {this.state.totalPrice} </div>
                <div>add to cart</div>
                <div>add to list</div>
                </div>
                <div className = "list">
                {this.state.relatedItems.map((item) => {
                   return <div className = "btItems">
                   <div>{item.title} </div>
                   <div> ${item.priceDollars}.{item.priceCents} </div>
                   </div>
                })}
                </div>
            </div>
        )
    }
}

export default BoughtTogether