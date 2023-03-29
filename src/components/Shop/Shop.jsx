import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const handleAddToCart = (pd) => {
        const newCart = [...cart, pd]
        setCart(newCart)
        addToDb(pd.id)
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
        const storedCart = getShoppingCart()
        console.log(storedCart);
    }, [])
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
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;