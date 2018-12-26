import React from "react";

class relatedItems extends React.Component {
  constructor(props) {
    super(props)
  };
  
  render() {
    return (

      <div className = "relCarousel">
          <a className = "btn" id="btnPrevPage" href='#'
          onClick ={this.props.prevPage}></a>
        {this.props.list.map(item => {
          return <div className='relItems' key={item.id} >
            <img src={item.imageUrl} className ="thumb"></img>
            <div className='relitem' id='relItemsTitle'>{item.title}</div>
            <div className='relitem' id='relItemsAuthor'>{item.author}</div>
            <div className='relitem' id='relItemsRating'>{item.rating}</div>
            <div className='relitem' id='relItemsRatingCount'>{item.ratingCount}</div>
            <div className='relitem' id='bookType'>{item.bookType}</div>
            <div className='relitem' id='relItemsPrice'>${item.priceDollars}.{item.priceCents}</div>
            <div className='relitem' id='relItemsPrime'>{item.prime}</div>
          </div>
        })}
          <a className = "btn" id="btnNextPage" href='#'
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