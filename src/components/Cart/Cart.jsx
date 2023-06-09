import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart, handleClearCart, children }) => {
    // console.log(cart);
    // const cart = props.cart;  option:1 
    // const { cart } = props;   option:2 
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const carts of cart) {
        // carts.quantity = carts.quantity || 1;
        if (carts.quantity === 0) {
            carts.quantity = 1;
        }
        totalPrice = totalPrice + carts.price * carts.quantity;
        totalShipping = totalShipping + carts.shipping;
        quantity = quantity + carts.quantity;
    }
    const tax = totalPrice * 7 / 100
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h1>Order Summery</h1>
            <p>Selected Items:{quantity}</p>
            <p>Total Price:{totalPrice} </p>
            <p>Shippings: {totalShipping}</p>
            <p>Tax:{tax.toFixed(2)}</p>
            <h3>Grand Total:{grandTotal.toFixed(2)} </h3>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <br />
            {children}
        </div>
    );
};

export default Cart;