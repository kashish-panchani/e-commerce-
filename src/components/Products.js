import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header";
import Footer from "../Footer";
import ProductsDetail from "./ProductsDetail";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
console.log("products::::",products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const perPage = 30;
  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
      setCount(parsedCartItems.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    console.log("storedWishlist",storedWishlist);
  }, []);

  const totalPages = Math.ceil(products.length / perPage);
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  console.log("ishover", isHover);
  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
  // const closeModal = () => {
  //   setSelectedProduct(null);
  //   setIsModalOpen(false);
  //   setAddedToCart(false);
  // };
  // const addToCart = () => {
  //   const isAlreadyInCart = cartItems?.some(
  //     (item) => item.id === selectedProduct.id
  //   );
  //   if (isAlreadyInCart) {
  //     setIsCartModalOpen(true);
  //     closeModal();
  //     return;
  //   }
  //   const maxQuantity = 10;
  //   const productWithQuantity = { ...selectedProduct, quantity: 1 };
  //   if (cartItems.length < maxQuantity) {
  //     setCartItems([...cartItems, productWithQuantity]);
  //     setCount(count + 1);
  //     setAddedToCart(true);
  //     // toast.success("Item added to cart successfully");
  //   }
  // };

  const toggleCartModal = () => {
    setIsCartModalOpen(true);
  };

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist?.some((item) => item.id === productId);
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

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  return (
    <div className=" bg-gray-100 overflow-hidden ">
      <Header
        count={count}
        toggleCartModal={toggleCartModal}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <section className="text-gray-600 py-15  body-font ">
        <div className="container mx-auto">
          {searchTerm && filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-2xl font-semibold">
              No products found
            </div>
          ) : (
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 ">
              {filteredProducts.slice(startIndex, endIndex).map((product) => (
                <div
                  key={product.id}
                  className="p-6 md:w-1/3 sm:mb-0 mb-6"
                  onClick={() => openModal(product)}
                >
                  <div
                    className="rounded-lg hover:shadow-2xl
                    cursor-pointer h-full bg-white px-10 py-4"
                  >
                    {/* ------------------------- */}
                    <Link to="/ProductsDetail">
                      <div
                        className="h-80 overflow-hidden "
                        onMouseEnter={() => {
                          setIshover(true);
                          setIsHoverSetProduct(product.id);
                        }}
                        onMouseLeave={() => setIshover(false)}
                      >
                        {isHoverSetProduct === product.id && isHover ? (
                          <Slider {...settings}>
                            {product.images.map((image, index) => (
                              <div
                                key={index}
                                className="h-fit w-32  object-cover"
                              >
                                <img
                                  src={image}
                                  alt="image"
                                  className="h-72 w-fit mx-auto"
                                  onClick={() => selectThumbnail(image)}
                                />
                              </div>
                            ))}
                          </Slider>
                        ) : (
                          <img
                            alt={product.title}
                            className="object-contain object-center h-full w-full"
                            src={product.thumbnail}
                          />
                        )}
                      </div>
                      <h2 className="text-xl pt-4 font-bold title-font text-gray-900 mt-5">
                        {product.title}
                      </h2>
                      <p className="text-lg text-ellipsis line-clamp-1 mt-2">
                        {product.description}
                      </p>
                      <div className="flex pt-3">
                        <p className="text-lg font-bold leading-relaxed">
                          <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
                          {product.price -
                            parseInt(
                              (product.price * product.discountPercentage) / 100
                            )}
                        </p>
                        <p className="text-base font-semibold px-3 leading-relaxed text-gray-500 line-through">
                          <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                          {product.price}
                        </p>
                        <p className="text-base leading-relaxed font-bold text-red-500">
                          ({product.discountPercentage}% off)
                        </p>
                      </div>{" "}
                    </Link>
                    <p className="text-lg leading-relaxed mt-2 py-1 w-20 border text-center font-semibold rounded-md">
                      {product.rating}
                      <i className="fa-solid fa-star pl-1 text-teal-500"></i>
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg leading-relaxed ">
                          <label
                            htmlFor=""
                            className="text-green-500 font-semibold"
                          >
                            In stock :{" "}
                          </label>
                          {product.stock}
                        </p>
                      </div>
                      {/* ----------BOX WISHLIST----- */}
                      <div
                        className={`border rounded-full text-center  px-3 mt-4 py-2   ${
                          wishlist?.some((item) => item.id === product.id)
                            ? "bg-gray-300 "
                            : ""
                        }`}
                        onClick={(e) => whishlistbtn(product.id, e)}
                      >
                        {wishlist?.some((item) => item.id === product.id) ? (
                          <i className="fas fa-heart text-rose-500 text-xl"></i>
                        ) : (
                          <i className="fa-regular fa-heart text-xl"></i>
                        )}
                        <label htmlFor="" className="font-semibold text-xl">
                          {wishlist?.some((item) => item.id === product.id)
                            ? ""
                            : ""}
                        </label>
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

      {!searchTerm || filteredProducts.length > perPage ? (
        <div className="flex justify-center py-12">
          <button
            onClick={handlePrevPage}
            className={`mx-2 px-5 py-3 text-lg border rounded-full ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            <i class="fa-solid fa-angle-left "></i>
          </button>
          <span className="pt-2 text-2xl ">page {currentPage} </span>
          <button
            onClick={handleNextPage}
            className={`mx-2 px-5 text-lg py-3 border rounded-full
                      ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-blue-500 text-white"
                      }`}
            disabled={currentPage === totalPages}
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default Products;
//   <div
//   className={`border flex justify-center items-center ml-1 px-1 mt-4 py-1 w-36  ${
//     wishlist.some((item) => item.id === product.id)
//     ? "bg-gray-300 "
// : ""
//   }`}
//   onClick={(e) => whishlistbtn(product.id, e)}
// >
//   {wishlist.some((item) => item.id === product.id) ? (
//     <i className="fas fa-heart text-red-600 mr-1"></i>
//   ) : (
//     <i className="fa-regular fa-heart "></i>
//   )}
//   <label htmlFor="" className="font-semibold mx-2">
//     {wishlist.some((item) => item.id === product.id)
//       ? "WISHLISTED"
//       : "WISHLIST"}
//   </label>
// </div>
