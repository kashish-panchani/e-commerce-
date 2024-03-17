import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductsDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedSelectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (storedSelectedProduct) setSelectedProduct(storedSelectedProduct);

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setCount(savedCartItems.length);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToCart = () => {
    const isAlreadyInCart = cartItems.some((item) => item.id === selectedProduct.id);
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (!isAlreadyInCart && cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      toast.success("Item added to cart successfully");
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, productWithQuantity]));
    } else if (isAlreadyInCart) {
      toast.error("This item is already in your cart.");
    } else {
      toast.error("You have reached the maximum quantity allowed in your cart.");
    }
  };
  
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== productId)
      : [...wishlist, selectedProduct];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast[isInWishlist ? "error" : "success"](isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (!selectedProduct) return null;

  return (
    <>
      <Header count={count} />
      <div className="container m-4 flex justify-between">
        <div className="flex w-full">
          <div className="p-5 flex flex-wrap">
            {selectedProduct.images.map((image, index) => (
              <div key={index} className="w-[500px] h-[500px] border m-2">
                <img src={image} alt="image" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 py-20 w-2/3">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{selectedProduct.title}</h1>
            <h1 className="text-gray-400 text-xl font-normal">{selectedProduct.category}</h1>
            <h1 className="text-gray-400 text-xl font-normal">{selectedProduct.description}</h1>
            <p className="text-gray-400 text-xl leading-relaxed font-normal">{selectedProduct.brand}</p>
            <div className="border border-gary-200 w-20 flex font-bold justify-evenly">
              {selectedProduct.rating} <i className="fa-solid fa-star mt-1 text-teal-500"></i>
            </div>
            <div className="border border-gray-300"></div>
          </div>

          <div className="flex  items-center  my-1 text-2xl font-bold text-black">
            <p className="text-2xl font-bold">
              <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
              {selectedProduct.price - (selectedProduct.price * selectedProduct.discountPercentage / 100)}
            </p>
            <p className="text-xl opacity-40 font-normal px-3 leading-relaxed line-through">
              ₹{selectedProduct.price}
            </p>
            <span className="opacity-40 text-xl font-normal"> MRP</span>{" "}
            <p className="text-lg leading-relaxed font-bold px-2 text-red-400">
              ({selectedProduct.discountPercentage}% off)
            </p>
          </div>
          <div className="text-teal-600 font-bold text-xl">inclusive of all taxes</div>

          <div className="flex flex-row gap-1">
          <button
              className="rounded-none py-3 px-4 h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
              onClick={addToCart}
            >
              {cartItems.some((item) => item.id === selectedProduct.id) ? (
                <Link to="/cart" className="text-white">
                  GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
                </Link>
              ) : (
                "ADD TO CART"
              )}
            </button>
         <button
                  className={`rounded-none py-3 px-4 h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
                    wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "bg-gray-300"
                      : ""
                  }`}
                  onClick={(e) => {
                    whishlistbtn(selectedProduct.id, e);
                  }}
                >
                  {wishlist?.some((item) => item.id === selectedProduct.id) ? (
                    <i className="fas fa-heart text-red-400 mr-1"></i>
                  ) : (
                    <i className="fa-regular fa-heart "></i>
                  )}
                  <label htmlFor="" className="font-semibold mx-2">
                    {wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "WISHLISTED"
                      : "WISHLIST"}
                  </label>
                </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsDetail;
 
    {/* <button
                  className={`rounded-none py-3 px-4 h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
                    wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "bg-gray-300"
                      : ""
                  }`}
                  onClick={(e) => {
                    whishlistbtn(selectedProduct.id, e);
                  }}
                >
                  {wishlist?.some((item) => item.id === selectedProduct.id) ? (
                    <i className="fas fa-heart text-red-600 mr-1"></i>
                  ) : (
                    <i className="fa-regular fa-heart "></i>
                  )}
                  <label htmlFor="" className="font-semibold mx-2">
                    {wishlist?.some((item) => item.id === selectedProduct.id)
                      ? "WISHLISTED"
                      : "WISHLIST"}
                  </label>
                </button> */}