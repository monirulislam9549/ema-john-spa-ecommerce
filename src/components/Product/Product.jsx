import React from 'react';
import './Product.css'

const Product = (props) => {
    const { img, name, price, ratings, seller, shipping, stock, quantity } = props.pd;
    const handleAddToCart = props.handleAddToCart;
    console.log(props);
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Ratings: {ratings} stars</p>
            </div>
            <button onClick={() => handleAddToCart(props.pd)} className='btn-cart'>Add To Cart</button>
        </div>
    );
};

export default Product;