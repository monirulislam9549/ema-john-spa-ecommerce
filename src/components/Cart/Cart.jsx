import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
    console.log(cart);
    // const cart = props.cart;  option:1 
    // const { cart } = props;   option:2 
    let total = 0;
    for (const carts of cart) {
        total = total + carts.price;
    }
    return (
        <div className='cart'>
            <h1>Order Summery</h1>
            <p>product:{cart.length}</p>
            <p>Total Price:{total} </p>
            <p>Total Shippings: { }</p>
            <p>Tax:{ }</p>
            <h6>Grand Total:{ } </h6>
        </div>
    );
};

export default Cart;