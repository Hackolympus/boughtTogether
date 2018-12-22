import React from "react";

class relatedItems extends React.Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (

      <div>
        {this.props.list.map(item => {
          return <div className = 'relItems' key={item.id} ><div src = {item.imageUrl}></div>{item.title}</div>
        })}
      </div>
    )
  };
}
export default relatedItems;
