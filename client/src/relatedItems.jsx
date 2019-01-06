import React from "react";
import Axios from "axios";

class relatedItems extends React.Component {
  constructor(props) {
    super(props)
  };
  
  render() {
    return (

      <div className = "relCarousel">
          <a className = "relBtn" id="relBtnPrevPage" href='#'
          onClick ={this.props.prevPage}></a>
          <div className = "relCarouselInner">
        {this.props.list.map(item => {

          return <div className='relItems' key={item.id} 
          ><a href = "#">
            <img src={"http://localhost:3015/bucket/" + item.id} className ="relThumb"></img>
            <div className='relItem' id='relItemsTitle'>{item.title}</div>
            <div className='relItem' id='relItemsAuthor'>{item.author}</div>
            <div className='relItem' id='relItemsRating'>{item.rating}</div>
            <div className='relItem' id='relItemsRatingCount'>{item.ratingCount}</div>
            <div className='relItem' id='bookType'>{item.bookType}</div>
            <div className='relItem' id='relItemsPrice'>${item.priceDollars}.{item.priceCents}</div>
            <div className='relItem' id='relItemsPrime'>{item.prime}</div>
            </a>  </div>
        })}
        </div>
          <a className = "relBtn" id="relBtnNextPage" href='#'
          onClick ={this.props.nextPage}></a>
      </div>
    )
  };
}
export default relatedItems;

/* {this.props.list.map(item => {
  return <div className='relItems' key={item.id} >
    <a className="btnPrevPage" href='#'><img src={item.imageUrl}></img></a>
    <div className='relItemsTitle'>{item.title}</div>
    <div className='relItemsAuthor'>{item.author}</div>
    <div className='relItemsRating'>{item.rating}</div>
    <div className='relItemsRatingCount'>{item.ratingCount}</div>
    <div className='bookType'>{item.bookType}</div>
    <div className='relItemsPrice'>${item.priceDollars}.{item.priceCents}</div>
    <div className='relItemsPrime'>{item.prime}</div>
  </div>
})}
 */