import React from 'react';
import Axios from "axios";

class BoughtTogether extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            priceNumber: 0,
            totalPrice: "",
            relatedItems: []
        }
        this.handleCheck = this.handleCheck.bind(this);
    }

    loadData() {
        let sum = 0;
        Axios.get("/related/" +this.props.currentListing).then((response) => {
          response.data.forEach(data => {
              sum += Number(data.price);
          })
          sum = sum + ""
          let total = '$' + sum.slice(0, sum.length - 2) + '.' + sum.slice(sum.length - 2, sum.length)
          this.setState({
              priceNumber: Number(sum),
              totalPrice: total,
            relatedItems: response.data
          });
        }).catch((err) => console.log(err))
      }
      
      handleCheck(event) {
          console.log(document.getElementById(event.target.value + "thumb").innerText)
          let price = (Number(event.target.dataset.price))
        if (event.target.checked === false) {
          let sum = this.state.priceNumber - price + ""
          let total = '$' + sum.slice(0, sum.length - 2) + '.' + sum.slice(sum.length - 2, sum.length)
        document.getElementById(event.target.value + "thumb").style.display = "none";
            this.setState({
                priceNumber: Number(sum),
                totalPrice: total
            })
        }
        else { let sum = this.state.priceNumber + price + ""
        let total = '$' + sum.slice(0, sum.length - 2) + '.' + sum.slice(sum.length - 2, sum.length)
            document.getElementById(event.target.value + "thumb").style.display = "block";
            this.setState({
                priceNumber: Number(sum),
                totalPrice: total
            })
        }
      }

      componentDidMount() {
        this.loadData()
      }
    
    render() {
        return (
            <div className = "boughtTogether">
                {this.state.relatedItems.map((item, index) => {
                   return <div className ="buyTgthrItems" id ={item.title + "thumb"} key = {item.id}>
                   {index === 0 ? (
                       <img src = {"http://localhost:3015/bucket/" + item.id} className = "xsThumb"></img>
                   ) : (
                       <a href = "#"><img src = {"http://localhost:3015/bucket/" + item.id} className = "xsThumb"></img></a>
                   )}
                   </div>
                })}
                
                <div className = "totalBox">
                <div>Total price: {this.state.totalPrice} </div>
                <div>add to cart</div>
                <div>add to list</div>
                </div>
                <div className = "list">
                {this.state.relatedItems.map((item, index) => {
                   return <div className = "btItems" key ={item.id}>
                   <input type = "checkbox" data-price = {item.price} value = {item.title} onChange = {this.handleCheck} defaultChecked></input>
                    {index === 0 ? (
                        <div>This item:{item.title}... </div>
                    ) : (
                   <div >{item.title}... </div>
                    )}
                   <div> ${item.priceDollars}.{item.priceCents} </div>
                   </div>
                })}
                </div>
            </div>
        )
    }
}

export default BoughtTogether