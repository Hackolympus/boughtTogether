import React from "react";

let items = ({ list }) => (
  <div>
    {list.map(item => {
      return <div key={item.id} src={item.imageUrl}>{item.title}</div>
    })}
  </div>
);
export default items;
