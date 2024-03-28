
import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ProductsDetail from "./ProductsDetail";
import "react-toastify/dist/ReactToastify.css";
import PleaseLogin from "./PleaseLogin ";
import Slider from "react-slick";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  console.log("setWishlist", wishlist);
console.log("loggedIn",loggedIn);
  console.log("selectedProduct", selectedProduct);
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  // console.log("product", products);
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
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
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
      toast.success("Item added to cart successfully", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
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
    toast.success("Item moved to cart successfully", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
  };
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === productId);
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      setWishlist(updatedWishlist);
      toast.error("Removed from wishlist", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setWishlist([...wishlist, productToAdd]);
        toast.success("Added to wishlist", {
          style: {
            width: "200px",
            fontSize: "12px",
            float: "right",
            marginTop: "50px",
          },
        });
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

    toast.error("Removed from wishlist", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  const productmodal = (product) => {
    openModal(product);
    setSearchTerm("");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);


  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };
  console.log("wishlist.length", wishlist.length);
  return (
    <div className="overflow-hidden">
      <Header
        count={count}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

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
      {filteredProducts && searchTerm ? (
        <section className="py-10 px-5 sm:px-10">
          <div className="container mx-auto py-10">
            {searchTerm && filteredProducts.length === 0 ? (
              <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
                No products found
              </div>
            ) : (
              <div className="flex flex-wrap -m-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 "
                    onClick={() => productmodal(product)}
                  >
                    <div className="bg-white hover:shadow-xl rounded-lg shadow-lg overflow-hidden">
                      <Link to="/ProductsDetail">
                        <div
                          className="h-64 overflow-hidden"
                          onMouseEnter={() => {
                            setIshover(true);
                            setIsHoverSetProduct(product.id);
                          }}
                          onMouseLeave={() => setIshover(false)}
                        >
                          {isHoverSetProduct === product.id && isHover ? (
                            <Slider {...settings}>
                              {product.images.map((image, index) => (
                                <div key={index} className="h-64">
                                  <img
                                    src={image}
                                    alt={`Product ${index}`}
                                    className="h-full w-full object-cover"
                                    onClick={() => selectThumbnail(image)}
                                  />
                                </div>
                              ))}
                            </Slider>
                          ) : (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <h2 className="text-lg font-bold line-clamp-1 text-gray-800">
                          {product.title}
                        </h2>
                        <p className="text-xs line-clamp-1 mt-2 text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex  justify-between  mt-3">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-800">
                              ₹
                              {product.price -
                                parseInt(
                                  (product.price * product.discountPercentage) /
                                    100
                                )}
                            </span>
                            <span class="font-semibold text-xs mx-2 line-through text-slate-900">
                              ₹{product.price}
                            </span>
                            <span className="text-xs leading-relaxed font- text-red-500">
                              ({product.discountPercentage}% off)
                            </span>
                          </div>
                          {/* Wishlist button */}
                          <div
                            className={`rounded-full text-center px-2 py-1 ${
                              wishlist?.some((item) => item.id === product.id)
                                ? "bg-gray-300"
                                : "bg-transparent border border-gray-300"
                            }`}
                            onClick={(e) => whishlistbtn(product.id, e)}
                          >
                            {wishlist?.some(
                              (item) => item.id === product.id
                            ) ? (
                              <i className="fas fa-heart text-rose-500"></i>
                            ) : (
                              <i className="far fa-heart text-gray-500"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* open model */}
            {isModalOpen && selectedProduct && <ProductsDetail />}
          </div>
        </section>
        ) :(
          <>
      {!loggedIn ? (
        <PleaseLogin handleLogin={handleLogin} />
      ) : (
      
        <div className="pb-10 sm:pb-0 sm:container sm:mx-auto">
          {wishlist.length ? (
            <>
              <div className="sm:container  my-5 sm:my-0   pl-4 sm:mt-16 sm:pl-16 sm:mx-auto font-bold text-xs sm:text-base  text-black">
                My Wishlist{" "}
                <span className="font-normal ">{wishlist.length} items</span>
              </div>

              <div class="sm:mx-auto relative mx-1 sm:mt-10   max-w-full xl:max-w-full lg:max-w-[1000px]  md:max-w-[704px] sm:max-w-[576px] grid grid-cols-2  xl:m-20   xl:grid-cols-4 md:grid-cols-3  sm:grid-cols-2     sm:m-8  overflow-hidden sm:rounded-lg ">
                {wishlist.map((product) => (
                  <div class="relative  flex flex-wrap  max-w-xl  my-1 mx-1 sm:my-3 xl:mx-3 md:mx-2 sm:m-2 overflow-hidden sm:rounded-lg border hover:shadow-xl border-gray-100 bg-white shadow-md">
                    <div className="w-full">
                      <button
                        className="  float-right"
                        onClick={(e) => removeFromWishlist(product.id, e)}
                      >
                        <i class="fa-solid fa-xmark my-3 mr-2   sm:mr-5"></i>
                      </button>
                    </div>
                    <Link
                      to="/ProductsDetail"
                      className="relative  mx-3  flex h-52 overflow-hidden "
                    >
                      <img
                        className="object-cover  sm:rounded-xl w-full sm:w-[300px]"
                        src={product.thumbnail}
                        alt="product image"
                        onClick={() => openModal(product)}
                      />
                    </Link>
                    <div class="mt-1  sm:mt-4 sm:px-5 w-full sm:pb-5">
                      <a href="#">
                        <h5 class="text-base   sm:text-lg pl-4 sm:pl-0 font-semibold tracking-tight line-clamp-1 text-slate-900">
                          {product.title}
                        </h5>
                      </a>
                      <div class="sm:mt-2 pl-4 sm:pl-0 mb-2 sm:mb-5  flex items-center justify-between">
                        <p>
                          <span className="text-xs sm:text-base font-bold leading-relaxed">
                            ₹
                            {product.price -
                              parseInt(
                                (product.price * product.discountPercentage) /
                                  100
                              )}
                          </span>

                          <span class="font-semibold text-[10px] sm:text-xs mx-1 line-through text-slate-900">
                            ₹{product.price}
                          </span>
                          <span className="sm:text-xs text-[10px] leading-relaxed  sm:font-bold text-orange-300 sm:text-red-500">
                            ({product.discountPercentage}% off)
                          </span>
                        </p>
                      </div>
                      <a
                        href="#"
                        class="flex items-center justify-center border-t sm:border sm:rounded-md sm:bg-slate-900 px-5 py-4 sm:py-2.5  text-sm font-medium text-rose-500 sm:text-white  hover:sm:bg-gray-700 focus:outline-none focus:ring-4 sm:focus:ring-blue-300"
                        onClick={(e) => moveToCart(product, e)}
                      >
                        Move to cart
                      </a>
                    </div>
             
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <h1 className="pt-36 flex justify-center items-center font-bold text-gray-700 text-base xl:text-2xl md:text-xl sm:text-lg">
                YOUR WISHLIST IS EMPTY
              </h1>
              <p className="flex justify-center items-center text-sm sm:text-base md:text-lg xl:text-xl  text-gray-400 py-5 px-10  ">
                Add items that you like to your wishlist. Review them anytime
                and easily move them to the bag.
              </p>
              <div className="flex items-center justify-center">
                <img
                  src="../empty-wishlist.png"
                  className=" py-3 w-56 xl:w-96 md:w-80"
                />
              </div>
              <div className="flex justify-center items-center ">
                <button className=" text-blue-600 text-sm font-bold border rounded-lg border-blue-800 my-10 py-4 px-4 xl:px-14 xl:text-xl md:px-10 md:text-base cursor-pointer">
                  <Link to="/ALL">CONTINUE SHOPPING</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      
      )}
      </>
  
      )}
    </div>
    
  );
};

export default Wishlist;
