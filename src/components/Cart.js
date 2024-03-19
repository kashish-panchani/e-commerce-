import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header2 from "../Header2";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Header from "../Header";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.length);
  }, [cartItems]);

  const decrease = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCartItems);
  };
  const increase = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
        : item
    );
    setCartItems(updatedCartItems);
  };
  const cartClose = (itemToRemove) => {
    setItemToRemove(itemToRemove);
  };
  const handleRemove = () => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCartItems);
    toast.error("Product removed from cart");
    setItemToRemove(null);
  };
  const handleCancelRemove = () => {
    setItemToRemove(null);
  };
  console.log("cartitem::", cartItems);
  return (
    <div>
      {/* <Header/> */}
      <Header count={count} />
      <div class="container mx-auto p-16">
        {cartItems.length === 0 ? (
          <div className=" text-center px-6  ">
            <div className="flex justify-center items-center ">
              <img src="../empty.svg" alt="" className="w-96 h-96" />
            </div>
            <div>
              <p className="font-bold text-2xl pb-2">Hey,it feels so light!</p>
              <p className="text-base text-gray-400">
                There is nothing in your cart.Let's add some items.{" "}
              </p>
            </div>
            <div>
              <Link to="/wishlist">
                <button className="border border-blue-800  rounded-md py-4 px-10 m-10 text-blue-600 font-bold">
                  ADD ITEMS FROM WISHLIST
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 class="mb-10 text-center  text-3xl font-bold">Shopping Cart</h1>
            <div class="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
              <div class="rounded-lg md:w-2/3">
                {cartItems.map((item) => (
                  <>
                    <div class="justify-between mb-6 border rounded-lg bg-white p-7 shadow-md sm:flex sm:justify-start">
                      <Link to="/ProductsDetail">
                        <img
                          src={item.thumbnail}
                          alt="product-image"
                          class="w-32 rounded-lg sm:w-40 object-contain h-32"
                        />
                      </Link>
                      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div class="mt-5 sm:mt-0">
                          <h2 class="text-lg font-bold text-gray-900">
                            {item.title}
                          </h2>
                          <p class="my-2 text-sm  text-gray-700">
                            {item.category}
                          </p>
                          <p class="my-2 text-sm  text-gray-700">
                            {item.description}
                          </p>
                          <p className="my-2">
                            <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                            {item.price -
                              parseInt(
                                (item.price * item.discountPercentage) / 100
                              )}{" "}
                            <label htmlFor="" className="text-green-600">
                              (Discount price)
                            </label>
                          </p>
                          <div class="flex items-center border-gray-100">
                            <span
                              className={`border  bg-slate-200 px-2 w-7 h-7 hover:bg-slate-100  ${
                                item.quantity <= 1 ? "cursor-not-allowed" : ""
                              }`}
                              disabled={item.quantity <= 1}
                              onClick={() => decrease(item.id)}
                            >
                              {" "}
                              -{" "}
                            </span>
                            <span className=" h-7 w-7 border bg-white text-center text-base">
                              {item.quantity}
                            </span>
                            <span
                              className={`border  bg-slate-200  hover:bg-slate-100 px-2 ${
                                item.quantity >= 10 ? "cursor-not-allowed" : ""
                              }`}
                              disabled={item.quantity >= 10}
                              onClick={() => increase(item.id)}
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                        </div>

                        <div class="mt-4  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="absolute ">
                            <button
                              className=" text-xl"
                              onClick={() => {
                                cartClose(item);
                                // toast.error("Product removed from cart");
                              }}
                            >
                              <i class="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div class="mb-2 flex justify-between">
                  <p class="text-gray-700 font-bold">Subtotal</p>
                  <p class="text-gray-700"></p>₹
                  {cartItems.reduce(
                    (total, item) =>
                      total +
                      item.quantity *
                        (item.price -
                          parseInt(
                            (item.price * item.discountPercentage) / 100
                          )),
                    0
                  )}
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700">Shipping</p>
                  <p class="text-gray-700">Free</p>
                </div>
                <div className="py-2">
                  <p class="text-gray-700">Platform fee:</p>
                  <p class="text-gray-700">Free</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                  <p class="text-lg font-bold">Total Amount:</p>

                  <p class="mb-1 text-lg font-bold">
                    {" "}
                    ₹
                    {cartItems.reduce(
                      (total, item) =>
                        total +
                        item.quantity *
                          (item.price -
                            parseInt(
                              (item.price * item.discountPercentage) / 100
                            )),
                      0
                    )}
                  </p>
                  {itemToRemove && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 w-80 text-gray-500 rounded-lg shadow-lg">
                      
                        <p className="text-sm font- mb-4">
                          Are you sure you want to remove this item from the
                          cart?
                        </p>
                        <hr />
                        <div className="flex justify-between items-center mx-8 mt-2 font-semibold">
                          <button
                            className=" text-rose-500  rounded-lg "
                            onClick={handleRemove}
                          >
                            Remove
                          </button>|
                          <button
                            className=" text-black rounded-lg"
                            onClick={handleCancelRemove}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
