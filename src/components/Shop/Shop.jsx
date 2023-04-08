import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const handleAddToCart = (pd) => {
        const newCart = [...cart, pd]
        setCart(newCart)
        addToDb(pd.id)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    useEffect(() => {
        const fetchData = async () => {
            const url = "products.json"
            try {
                const res = await fetch(url)
                const data = await res.json()
                setProducts(data)
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // console.log('products', products);
        const storedCart = getShoppingCart()
        const savedCart = [];
        // step:1 get id
        for (const id in storedCart) {
            // step:2 get the product from using state by using id
            const addedProduct = products.find(product => product.id === id)
            // step:3 get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                // step:4 push the addedProduct to the saveCart
                savedCart.push(addedProduct);
            }
        }
        // step:5 set the cart
        setCart(savedCart)
    }, [products])
    return (
        <div className='shop-container'>
            {/* <h1>This products container:{products.length}</h1> */}
            <div className='products-container'>
                {
                    products.map(pd => <Product
                        pd={pd}
                        key={pd.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;