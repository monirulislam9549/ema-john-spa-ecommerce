import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();

  // Todo:make it dynamic
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalProducts; i++) {
  //     pageNumbers.push(i);
  //   }

  const pageNumbers = [...Array(totalPages).keys()];
  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage();
  };

  const handleAddToCart = (pd) => {
    const newCart = [...cart, pd];
    setCart(newCart);
    addToDb(pd._id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step:1 get id
        for (const id in storedCart) {
          // step:2 get the product from using state by using id
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          // step:3 get quantity of the product
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step:4 push the addedProduct to the saveCart
            savedCart.push(addedProduct);
          }
        }
        // step:5 set the cart
        setCart(savedCart);
      });
  }, []);

  return (
    <>
      <div className="shop-container">
        {/* <h1>This products container:{products.length}</h1> */}
        <div className="products-container">
          {products.map((pd) => (
            <Product
              pd={pd}
              key={pd._id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="btn-proceed">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>
          Current Page:{currentPage} and item per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "selected" : ""}
            key={number}
          >
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
