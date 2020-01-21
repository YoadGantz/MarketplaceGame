import React from 'react';

export default function GameDesc(props){
    const  {thumbnail,description,publishedAt,publisherName,rating,downloads,addToCart,price}=props
    return(
    <div>
    <img alt="" className="game-thumbnail" src={thumbnail}></img>
    <div className='game-description'>
      <p > {description}</p>
      <p> Published at: {publishedAt}</p>
      <p> Publisher: {publisherName}</p>
      <p> Rating: {rating}</p>
      <p> Downloads last month :{downloads}   </p>
      <button type="primary" className='game-buy-button' onClick={addToCart}>
    {price}$ Add to cart
    </button>
    </div>
    </div>)

}
 