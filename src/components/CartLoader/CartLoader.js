import { getShoppingCart } from "../../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
  console.log(ids);

  const loadedProducts = await fetch(`http://localhost:5000/productByIds`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProducts.json();
  console.log("objects id:", products);

  // if cart data in database, you have to use async await
  const savedCart = [];

  // for in on object
  for (const id in storedCart) {
    const addedProduct = products.find((pds) => pds._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  // if you need to send two things
  // return [products, savedCart]
  // or
  // return {products, savedCart}
  return savedCart;
};

export default cartProductsLoader;
