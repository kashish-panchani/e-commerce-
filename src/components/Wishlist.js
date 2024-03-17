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
    console.log("product",product);
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

  const moveToCart = (product,e) => {
    e.stopPropagation()
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
 <Header count={count}/>
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
          <div className="container mx-auto font-bold text-3xl pt-44 pl-5 text-black">
            My Wishlist{" "}
            <span className="font-normal ">{wishlist.length} items</span>
          </div>

          <div className="container mx-auto pb-36  flex flex-wrap ">
            {wishlist.map((product) => (
              <div key={product.id} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div
                  className=" border rounded-3xl  hover:shadow-2xl
                 cursor-pointer h-full bg-white px-10  mt-20  "
                  onClick={() => openModal(product)}
                >
                  <div className=" float-right pt-6  ">
                    <button onClick={(e) => removeFromWishlist(product.id, e)}>
                      <i className="fa-solid fa-xmark text-3xl "></i>
                    </button>
                  </div>
                  <div className="h-60 w-96 overflow-hidden">
                    <img
                      alt={product.title}
                      className="object-contain  object-center h-full w-full"
                      src={product.thumbnail}
                    />
                  </div>
                  <h2 className="text-2xl py-1 font-semibold text-gray-900 mt-5">
                    {product.title}
                  </h2>

                  <p className="text-xl  title-font text-gray-900 mt-5">
                    {product.brand}
                  </p>
                  <div className="flex items-center pt-3">
                    <p className="text-2xl font-bold leading-relaxed">
                      ₹
                      {product.price -
                        parseInt(
                          (product.price * product.discountPercentage) / 100
                        )}
                    </p>
                    <p className="text-base font-semibold px-3 leading-relaxed  text-gray-500 line-through">
                      <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                      {product.price}
                    </p>
                  </div>
                    <p className="text-lg leading-relaxed mt-2 font-bold text-red-500">
                      ({product.discountPercentage}% off)
                    </p>
                  <div
                    className="border mt-20  py-5 text-xl text-white  font-semibold flex items-center justify-center bg-slate-600"
                    onClick={(e) => moveToCart(product,e)}
                  >
                    <h1>MOVE TO CART</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
<Footer />
    </div>
  );
};


export default Wishlist;
 // <div className=" bg-gray-100 overflow-hidden ">
    //   <Header
    //     count={count}
    //     toggleCartModal={toggleCartModal}
    //     searchTerm={searchTerm}
    //     handleSearchChange={handleSearchChange}
    //   />

    //   <section className="text-gray-600 py-15  body-font ">
    //     <div className="container mx-auto">
    //       {searchTerm && filteredProducts.length === 0 ? (
    //         <div className="text-center py-10 text-2xl font-semibold">
    //           No products found
    //         </div>
    //       ) : (
    //         <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 ">
    //           {filteredProducts.slice(startIndex, endIndex).map((product) => (
    //             <div
    //               key={product.id}
    //               className="p-6 md:w-1/3 sm:mb-0 mb-6"
    //               onClick={() => openModal(product)}
    //             >
    //               <div
    //                 className="rounded-lg hover:shadow-2xl
    //                 cursor-pointer h-full bg-white px-10 py-4"
    //               >
    //                 {/* ------------------------- */}
    //                 <Link to="/ProductsDetail">
    //                   <div
    //                     className="h-80 overflow-hidden "
    //                     onMouseEnter={() => {
    //                       setIshover(true);
    //                       setIsHoverSetProduct(product.id);
    //                     }}
    //                     onMouseLeave={() => setIshover(false)}
    //                   >
    //                     {isHoverSetProduct === product.id && isHover ? (
    //                       <Slider {...settings}>
    //                         {product.images.map((image, index) => (
    //                           <div
    //                             key={index}
    //                             className="h-fit w-32  object-cover"
    //                           >
    //                             <img
    //                               src={image}
    //                               alt="image"
    //                               className="h-72 w-fit mx-auto"
    //                               onClick={() => selectThumbnail(image)}
    //                             />
    //                           </div>
    //                         ))}
    //                       </Slider>
    //                     ) : (
    //                       <img
    //                         alt={product.title}
    //                         className="object-contain object-center h-full w-full"
    //                         src={product.thumbnail}
    //                       />
    //                     )}
    //                   </div>
    //                   <h2 className="text-xl pt-4 font-bold title-font text-gray-900 mt-5">
    //                     {product.title}
    //                   </h2>
    //                   <p className="text-lg text-ellipsis line-clamp-1 mt-2">
    //                     {product.description}
    //                   </p>
    //                   <div className="flex pt-3">
    //                     <p className="text-lg font-bold leading-relaxed">
    //                       <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
    //                       {product.price -
    //                         parseInt(
    //                           (product.price * product.discountPercentage) / 100
    //                         )}
    //                     </p>
    //                     <p className="text-base font-semibold px-3 leading-relaxed text-gray-500 line-through">
    //                       <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
    //                       {product.price}
    //                     </p>
    //                     <p className="text-base leading-relaxed font-bold text-red-500">
    //                       ({product.discountPercentage}% off)
    //                     </p>
    //                   </div>{" "}
    //                 </Link>
    //                 <p className="text-lg leading-relaxed mt-2 py-1 w-20 border text-center font-semibold rounded-md">
    //                   {product.rating}
    //                   <i className="fa-solid fa-star pl-1 text-teal-500"></i>
    //                 </p>
    //                 <div className="flex justify-between items-center">
    //                   <div>
    //                     <p className="text-lg leading-relaxed ">
    //                       <label
    //                         htmlFor=""
    //                         className="text-green-500 font-semibold"
    //                       >
    //                         In stock :{" "}
    //                       </label>
    //                       {product.stock}
    //                     </p>
    //                   </div>
    //                   {/* ----------BOX WISHLIST----- */}
    //                   <div
    //                     className={`border rounded-full text-center  px-3 mt-4 py-2   ${
    //                       wishlist?.some((item) => item.id === product.id)
    //                         ? "bg-gray-300 "
    //                         : ""
    //                     }`}
    //                     onClick={(e) => whishlistbtn(product.id, e)}
    //                   >
    //                     {wishlist?.some((item) => item.id === product.id) ? (
    //                       <i className="fas fa-heart text-rose-500 text-xl"></i>
    //                     ) : (
    //                       <i className="fa-regular fa-heart text-xl"></i>
    //                     )}
    //                     <label htmlFor="" className="font-semibold text-xl">
    //                       {wishlist?.some((item) => item.id === product.id)
    //                         ? ""
    //                         : ""}
    //                     </label>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //       {/* open model */}
    //       {isModalOpen && selectedProduct && <ProductsDetail />}
    //     </div>
    //   </section>

    //   {!searchTerm || filteredProducts.length > perPage ? (
    //     <div className="flex justify-center py-12">
    //       <button
    //         onClick={handlePrevPage}
    //         className={`mx-2 px-5 py-3 text-lg border rounded-full ${
    //           currentPage === 1
    //             ? "bg-gray-300 cursor-not-allowed text-gray-500"
    //             : "bg-blue-500 text-white"
    //         }`}
    //         disabled={currentPage === 1}
    //       >
    //         <i class="fa-solid fa-angle-left "></i>
    //       </button>
    //       <span className="pt-2 text-2xl ">page {currentPage} </span>
    //       <button
    //         onClick={handleNextPage}
    //         className={`mx-2 px-5 text-lg py-3 border rounded-full
    //                   ${
    //                     currentPage === totalPages
    //                       ? "bg-gray-300 cursor-not-allowed text-gray-500"
    //                       : "bg-blue-500 text-white"
    //                   }`}
    //         disabled={currentPage === totalPages}
    //       >
    //         <i class="fa-solid fa-angle-right"></i>
    //       </button>
    //     </div>
    //   ) : null}
    //   <Footer />
    // </div>