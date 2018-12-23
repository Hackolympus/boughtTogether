import React from "react";

class relatedItems extends React.Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (

      <div>
        {this.props.list.map(item => {
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
      </div>
    )
  };
}
export default relatedItems;
