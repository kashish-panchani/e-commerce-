import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
// import ProductModal from "../ProductModal";
// import Header2 from "../Header2";
import Footer from "../Footer";
import Header from "../Header";
import ProductsDetail from "./ProductsDetail";
const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  console.log("setWishlist", wishlist);

  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  console.log("product", products);
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

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    // gotocart
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    console.log("product", product);
  });
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setAddedToCart(false);
  };
  const addToCart = () => {
    const isAlreadyInCart = cartItems?.some(
      (item) => item.id === selectedProduct.id
    );
    if (isAlreadyInCart) {
      setIsCartModalOpen(true);
      closeModal();
      return;
    }
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      setAddedToCart(true);
      toast.success("Item added to cart successfully");
    }
  };

  const moveToCart = (product, e) => {
    e.stopPropagation();
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item moved to cart successfully");
  };
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === productId);
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      setWishlist(updatedWishlist);
      toast.error("Removed from wishlist");

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setWishlist([...wishlist, productToAdd]);
        toast.success("Added to wishlist");
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, productToAdd])
        );
      }
    }
  };
  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };
  const removeFromWishlist = (productId, e) => {
    e.stopPropagation();
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);

    toast.success("Removed from wishlist");
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  console.log("wishlist.length", wishlist.length);
  return (
    <div>
      <Header count={count} />
      {isModalOpen && selectedProduct && (
        <ProductsDetail
          selectedProduct={selectedProduct}
          closeModal={closeModal}
          selectThumbnail={selectThumbnail}
          addToCart={addToCart}
          addedToCart={addedToCart}
          wishlist={wishlist}
          whishlistbtn={whishlistbtn}
        />
      )}
      {wishlist.length ? (
        <>
          <div className="container mt-16 ml-15 mx-auto font-bold text-base  text-black">
            My Wishlist{" "}
            <span className="font-normal ">{wishlist.length} items</span>
          </div>
          <div class="relative m-16 grid grid-cols-4  max-w-full overflow-hidden rounded-lg ">
            {wishlist.map((product) => (
              <>
                <div class="relative m-2 flex flex-wrap  max-w-xs overflow-hidden rounded-lg border hover:shadow-xl border-gray-100 bg-white shadow-md">
                  <div className="w-full">
                    <button
                      className="  float-right"
                      onClick={(e) => removeFromWishlist(product.id, e)}
                    >
                      <i class="fa-solid fa-xmark mt-5 mr-5"></i>
                    </button>
                  </div>
                  <a
                    className="relative  mx-3 mt-3 flex h-52 overflow-hidden "
                    href="#"
                  >
                    <img
                      style={{ width: "300px" }}
                      className="object-contain rounded-xl"
                      src={product.thumbnail}
                      alt="product image"
                    />
                    {/* <div className="flex justify-between  items-center w-full absolute top-0 left-0 p-2">
                      <span className="rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {product.discountPercentage}% OFF
                      </span>
                    </div> */}
                  </a>
                  <div class="mt-4 px-5 w-full pb-5">
                    <a href="#">
                      <h5 class="text-lg tracking-tight line-clamp-1 text-slate-900">
                        {product.title}
                      </h5>
                    </a>
                    <div class="mt-2 mb-5  flex items-center justify-between">
                      <p>
                        <span className="text-base font-bold leading-relaxed">
                          ₹
                          {product.price -
                            parseInt(
                              (product.price * product.discountPercentage) / 100
                            )}
                        </span>

                        <span class="font-semibold text-xs mx-1 line-through text-slate-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs leading-relaxed font-bold text-red-500">
                          ({product.discountPercentage}% off)
                        </span>
                      </p>
                    </div>
                    <a
                      href="#"
                      class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={(e) => moveToCart(product, e)}
                    >
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg> */}
                      Move to cart
                    </a>
                  </div>
                </div>
              </>
            ))}
          </div>
          {/* <div className="container mx-auto flex flex-wrap ">
            {wishlist.map((product) => (
              <div key={product.id} className="p-4">
                <div
                  className=" border  hover:shadow-xl w-fit
                 cursor-pointer  bg-white   mt-20  "
                  onClick={() => openModal(product)}
                >
                  <div className=" absolute border bg-gray-100 rounded-full ">
                    <button onClick={(e) => removeFromWishlist(product.id, e)}>
                      <i className="fa-solid fa-xmark px-1 pl text-xs"></i>
                    </button>
                  </div>
                  <div className="h-fit  w-60 overflow-hidden">
                    <img
                      alt={product.title}
                      className="h-full  w-full object-cover"
                      src={product.thumbnail}
                    />
                  </div>
                  <h2 className="text-xl py-1 font-semibold text-gray-900 mt-5">
                    {product.title}
                  </h2>

                  <p className="text-lg  title-font text-gray-900">
                    {product.brand}
                  </p>
                  <div className="flex items-center ">
                    <p className="text-sm font-bold leading-relaxed">
                      ₹
                      {product.price -
                        parseInt(
                          (product.price * product.discountPercentage) / 100
                        )}
                    </p>
                    <p className="text-xs font-semibold px-3 leading-relaxed  text-gray-500 line-through">
                      <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                      {product.price}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed font-bold text-red-500">
                    ({product.discountPercentage}% off)
                  </p>
                  <div
                    className="border mt-5  py-5 text-sm text-white  font-semibold flex items-center justify-center bg-slate-600"
                    onClick={(e) => moveToCart(product, e)}
                  >
                    <h1>MOVE TO CART</h1>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <>
          <div>
            <h1 className="pt-36 flex justify-center items-center font-bold text-gray-700 text-2xl">
              YOUR WISHLIST IS EMPTY
            </h1>
            <p className="flex justify-center items-center text-xl text-gray-400 py-5  ">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <div className="flex items-center justify-center">
              <img src="../empty-wishlist.png" className=" py-3" />
            </div>
            <div className="flex justify-center items-center ">
              <button className=" text-blue-600 text-xl font-bold border rounded-lg border-blue-800 my-10 py-4 px-14 cursor-pointer">
                <Link to="/ALL">CONTINUE SHOPPING</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
