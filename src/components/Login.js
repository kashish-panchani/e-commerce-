import React, { useCallback, useEffect, useState } from "react";
import picture from "../Images/pic.webp";
import Header from "./Header";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import ProductsDetail from "./ProductsDetail";
import Slider from "react-slick";
import { productmodal, settings } from "../Constants";
import ProductItems from "./ProductItems";

const Login = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  console.log("products",products);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);
    useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const validEmail = "kashish@gmail.com";
    const validPassword = "12345678";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Successfully logged in!", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
      navigate("/wishlist");
    } else {
      toast.error("Incorrect email or password. Please try again.", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast.success("Successfully logged out!", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });

    navigate("/");
  };

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    const isInCart = cartItems?.some((item) => item.id === product.id);
    setAddedToCart(isInCart);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  });
  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist?.some((item) => item.id === productId);
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
  return (
    <div className="overflow-hidden">
      <Header
        count={count}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {filteredProducts && searchTerm ? (
        <section className="py-10 px-5 sm:px-10">
          <div className="container mx-auto py-10">
            {searchTerm && filteredProducts.length === 0 ? (
              <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
                No products found
              </div>
            ) : (
              <ProductItems
                productmodal={productmodal}
                filteredProducts={filteredProducts}
                setIshover={setIshover}
                setIsHoverSetProduct={setIsHoverSetProduct}
                isHoverSetProduct={isHoverSetProduct}
                isHover={isHover}
                selectThumbnail={selectThumbnail}
                wishlist={wishlist}
                whishlistbtn={whishlistbtn}
                openModal={openModal}
                setSearchTerm={setSearchTerm}
              />
            )}
        
          </div>
        </section>
      ) : (
        <>
          {!isLoggedIn ? (
            <section class="bg-gray-50 dark:bg-gray-900">
              <div class="flex flex-col items-center justify-center px-6 py-16 mx-auto  ">
                {/* <div> */}

                <div class=" bg-white  shadow dark:border md:mt-0 max-w-[260px] sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <img src={picture} alt="" className="object-contain" />
                  <div class="p-3  space-y-4 md:space-y-6  sm:p-8">
                    <h1 class="sm:text-xl text-base font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    <form
                      onSubmit={handleLogin}
                      class="space-y-4 md:space-y-6"
                      action="#"
                    >
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          required=""
                        />
                      </div>
                      <div>
                        <label
                          for="password"
                          class="block mb-2  text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={handlePasswordChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                      </div>

                      <button
                        type="submit"
                        class="w-full border  text-white bg-rose-500  focus:outline-none font-medium rounded-lg text-sm sm:text-md px-5 py-2.5 text-center "
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <Logout handleLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
};

export default Login;
