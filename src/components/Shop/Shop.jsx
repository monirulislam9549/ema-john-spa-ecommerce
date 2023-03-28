import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
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
    return (
        <div className='shop-container'>
            {/* <h1>This products container:{products.length}</h1> */}
            <div className='products-container'>
                {
                    products.map(pd => <Product
                        pd={pd}
                        key={pd.id}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <h1>Order Summery</h1>
            </div>
        </div>
    );
};

export default Shop;