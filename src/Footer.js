import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-600" >
      <div className="container mx-auto py-8 px-4 ">
        <div className="flex justify-center">
          <div className="w-full lg:w-1/3 lg:text-left text-center mb-4 lg:mb-0">
            <h4 className="text-lg font-bold mb-4">GET TO KNOW US</h4>
            <ul>     
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3 lg:text-left text-center mb-4 lg:mb-0">
            <h4 className="text-lg font-bold mb-4">CONNECT WITH US</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3 lg:text-left text-center">
            <h4 className="text-lg font-bold mb-4">MAKE MONEY WITH US</h4>
            <ul>
              <li>Sell on Myntra</li>
              <li>Sell under MyntraAccelerator</li>
              <li>Myntra Global Selling</li>
              <li>Become an Affiliate</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3 lg:text-left text-center">
            <h4 className="text-lg font-bold mb-4">LET US HELP YOU</h4> 
            <ul>
              <li>Contact us</li>
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>100% Purchase Protection</li>
            </ul>
          
          </div>
          
        </div>
        <div className="my-10">
        <h1 className="font-bold">MYNTRA APP</h1>
        <p className="text-lg">Myntra, India’s no. 1 online fashion destination justifies its fashion relevance by bringing something new and chic to the table on the daily. Fashion trends seem to change at lightning speed, yet the Myntra shopping app has managed to keep up without any hiccups. In addition, Myntra has vowed to serve customers to the best of its ability by introducing its first-ever loyalty program, The Myntra Insider. Gain access to priority delivery, early sales, lucrative deals and other special perks on all your shopping with the Myntra app. Download the Myntra app on your Android or IOS device today and experience shopping like never before!</p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="w-full lg:w-1/2 lg:text-left text-center">
            <div className="flex items-center justify-center">
              <img
                src="../myntralogo.png"
                alt="Amazon Logo"a
                className="h-16 mr-2 "
              />
              </div>
              <div className="text-center">
              <span className="text-lg font-bold ">
                © 1996-2023, Myntra.com, Inc. or its affiliates
              </span>
              </div>
            </div>
          </div>
        </div>
     
    </footer>
  );
}

export default Footer;
// import React from "react";
// import { toast } from "react-toastify";
// import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// const Wishlist = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [count, setCount] = useState(0);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [showWishlist, setShowWishlist] = useState(false);
//   const [wishlistItem, setWishlistItems] = useState([]);
//   console.log("setWishlist", wishlist);

//   const wishlistmodel = () => {
//     setShowWishlist(true);
//   };

//   // const closeWishlist = () => {
//   //   setWishlistItems([...wishlistItem]);
//   // };
//   const perPage = 30;
//   console.log("selectedProduct", selectedProduct);
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`https://dummyjson.com/products?limit=0`);
//       const data = await response.json();
//       setProducts(data.products);
//     };
//     fetchData();
//   }, []);
//   console.log("product", products);
//   useEffect(() => {
//     const savedCartItems = localStorage.getItem("cartItems");
//     if (savedCartItems) {
//       const parsedCartItems = JSON.parse(savedCartItems);
//       setCartItems(parsedCartItems);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     setCount(cartItems.length);
//   }, [cartItems]);

//   useEffect(() => {
//     const savedWishlist = localStorage.getItem("wishlist");
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   //   useEffect(() => {

//   //     const userData = JSON.parse(localStorage.getItem('wishlist'));
//   // console.log(userData);
//   //   }, []);
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem("wishlist");
//     if (savedWishlist) {
//       const parsedwishItems = JSON.parse(savedWishlist);
//       setWishlistItems(parsedwishItems);
//       // setCount(parsedwishItems.length);
//     }
//   }, []);

//   const totalPages = Math.ceil(products.length / perPage);
//   // const FilterTotalPages = Math.ceil(filteredProducts.length / perPage);

//   useEffect(() => {
//     const filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, products]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const openModal = useCallback((product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);

//     // gotocart
//     const isInCart = cartItems.some((item) => item.id === product.id);
//     setAddedToCart(isInCart);
//   });

//   const selectThumbnail = (image) => {
//     setSelectedProduct((prevProduct) => ({
//       ...prevProduct,
//       thumbnail: image,
//     }));
//   };
//   const closeModal = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(false);
//     setAddedToCart(false);
//   };
//   const addToCart = () => {
//     const isAlreadyInCart = cartItems.some(
//       (item) => item.id === selectedProduct.id
//     );
//     if (isAlreadyInCart) {
//       setIsCartModalOpen(true);
//       closeModal();
//       return;
//     }
//     const maxQuantity = 10;
//     const productWithQuantity = { ...selectedProduct, quantity: 1 };
//     if (cartItems.length < maxQuantity) {
//       setCartItems([...cartItems, productWithQuantity]);
//       setCount(count + 1);
//       setAddedToCart(true);
//       toast.success("Item added to cart successfully");
//     }
//   };

//   const decrease = (productId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === productId
//         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//         : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const increase = (productId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === productId
//         ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
//         : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const toggleCartModal = () => {
//     setIsCartModalOpen(true);
//   };

//   const cartClose = (itemToRemove) => {
//     const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
//     setCartItems(updatedCartItems);
//     setCount(count - 1);
//   };
//   const removeFromWishlist = (productId) => {
//     const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//     setWishlist(updatedWishlist);
//     toast.success("Removed from wishlist");
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   const startIndex = (currentPage - 1) * perPage;
//   const endIndex = currentPage * perPage;

//   const whishlistbtn = (productId) => {
//     const isInWishlist = wishlist.some((item) => item.id === productId);
//     if (isInWishlist) {
//       // Remove from wishlist
//       const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//       setWishlist(updatedWishlist);
//       toast.success("Removed from wishlist");
//       // Update local storage
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     } else {
//       // Add to wishlist
//       const productToAdd = products.find((product) => product.id === productId);
//       if (productToAdd) {
//         setWishlist([...wishlist, productToAdd]);
//         toast.success("Added to wishlist");
//         // Update local storage
//         localStorage.setItem(
//           "wishlist",
//           JSON.stringify([...wishlist, productToAdd])
//         );
//       }
//     }
//   };

//   console.log("wishlist.length", wishlist.length);
//   return (
//     <div className=" bg-gray-100 ">
//       <header className="fixed w-full bg-gray-800">
//         <nav className=" flex items-center  justify-between h-28">
//           <div className="flex items-center ">
//             <Link to="/">
//               <img src="../myntralogo.png" className="w-44 mt-2 hover:border" />
//             </Link>
//             <div className="text-white mx-">
//               <p className=" text-xl">Deliver to</p>
//               <div className="flex">
//                 <i class="fa-solid fa-location-dot text-2xl mr-1"></i>
//                 <p className="text-2xl font-bold">India</p>
//               </div>
//             </div>

//             <div className="mx-12 text-2xl flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search For Products..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="pl-5 py-3 pr-36 bg-gray-600  text-white focus:outline-none"
//               />
//               <button className=" border-l-0 px-5 py-3 bg-gray-600 text-white">
//                 <i className="fas fa-search"></i>
//               </button>
//             </div>
//           </div>
//           <div className="ml-auto">
//             <Link to="/wishlist">
//               <i class="fa-regular fa-heart left-10 text-white text-3xl pr-3 mb-2"></i>
//             </Link>
//             {/* <span className="float-right font-bold border-black text-white px-2 text-center rounded-full mr-2 bg-red-500 text-lg">
//               {wishlist.length}
//             </span> */}
//           </div>
//           <div className="text-white cursor-pointer mr-12  hover:text-gray-300">
//             <i
//               class="fa-solid fa-cart-shopping text-4xl float-right py-7 "
//               onClick={toggleCartModal}
//             ></i>

//             <span className="float-right font-bold border-black text-white px-2  text-center rounded-full my-3 bg-red-500 text-lg">
//               {count}
//             </span>
//           </div>
//         </nav>
//       </header>

//       {wishlist.length ? (
//         <>
//           <div className="container mx-auto pb-36 pt-12  flex flex-wrap ">
//             {wishlist.map((product) => (
//               <div key={product.id} className="  p-4 md:w-1/3 sm:mb-0 mb-6">
//                 <div
//                   className=" border  hover:shadow-2xl
//                  cursor-pointer h-full bg-white px-10  mt-20  "
//                 >
//                   <div className=" float-right py-4  ">
//                     <button onClick={() => removeFromWishlist(product.id)}>
//                       <i className="fa-solid fa-xmark text-2xl "></i>
//                     </button>
//                   </div>
//                   <div className="h-60 w-96 overflow-hidden">
//                     <img
//                       alt={product.title}
//                       className="object-contain  object-center h-full w-full"
//                       src={product.thumbnail}
//                     />
//                   </div>
//                   <h2 className="text-2xl pt-4  title-font text-gray-900 mt-5">
//                     {product.title}
//                   </h2>
//                   {/* <p className="text-lg text-ellipsis line-clamp-2 mt-2">
//                   {product.description}
//                 </p> */}
//                   <div className="flex items-center pt-3">
//                     <p className="text-2xl font-bold leading-relaxed">
//                       ₹
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
//                   </div>
//                   <div className="border mt-20  py-5 text-xl font-semibold flex items-center justify-center">
//                     <h1>MOVE TO CART</h1>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <>
//           <div>
//             <h1 className="pt-44 flex justify-center items-center font-semibold text-3xl">
//               YOUR WISHLIST IS EMPTY
//             </h1>
//             <p className="flex justify-center items-center text-3xl text-gray-500 py-5">
//               Add items that you like to your wishlist. Review them anytime and
//               easily move them to the bag.
//             </p>
//             <div className="flex items-center justify-center">
//               <img src="../empty-wishlist.png" className=" py-10" />
//             </div>
//             <div className="flex justify-center items-center ">
//               <button className=" text-blue-600 text-2xl font-bold border rounded-lg border-blue-800 my-10 py-6 px-8 cursor-pointer">
//                 <Link to="/">CONTINUE SHOPPING</Link>
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Cart Modal */}
//       {isCartModalOpen && (
//         <div className="fixed  inset-0 z-50 h-full overflow-y-scroll ">
//           <div className="flex items-center justify-center min-h-screen  ">
//             <div className="fixed inset-0 bg-black opacity-50"></div>
//             <div className="bg-white flex justify-center items-center rounded-lg shadow-xl max-w-2xl relative z-10">
//               <div className="py-10 px-10  w-full max-h-full overflow-y-auto">
//                 <button
//                   className="float-right text-2xl"
//                   onClick={() => setIsCartModalOpen(false)}
//                 >
//                   <i className="fa-solid fa-xmark "></i>
//                 </button>
//                 <h2 className="text-3xl font-bold pb-8">Shopping Cart</h2>
//                 <div>
//                   {cartItems.map((item) => (
//                     <div key={item.id}>
//                       <div className="flex border pr-32 py-4 w-full  mb-3">
//                         <div className=" relative px-2">
//                           <img
//                             src={item.thumbnail}
//                             alt={item.title}
//                             className="w-44 h-28 object-cover border "
//                           />
//                         </div>
//                         <div className="text-lg px-4">
//                           <p className="font-bold">{item.title}</p>
//                           <p>{item.brand}</p>

//                           <p>
//                             <label htmlFor="">category : </label>
//                             {item.category}
//                           </p>
//                           <div>
//                             <button
//                               onClick={() => decrease(item.id)}
//                               className={`border bg-slate-200 px-1 hover:bg-slate-100  ${
//                                 item.quantity <= 1 ? "cursor-not-allowed" : ""
//                               }`}
//                               disabled={item.quantity <= 1}
//                             >
//                               <i className="fa-solid fa-minus"></i>
//                             </button>
//                             <span className="px-1">{item.quantity}</span>
//                             <button
//                               onClick={() => increase(item.id)}
//                               className={`border  bg-slate-200  hover:bg-slate-100 px-1 ${
//                                 item.quantity >= 10 ? "cursor-not-allowed" : ""
//                               }`}
//                               disabled={item.quantity >= 10}
//                             >
//                               <i className="fa-solid fa-plus"></i>
//                             </button>
//                           </div>
//                           <p>
//                             {" "}
//                             <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
//                             {item.price -
//                               parseInt(
//                                 (item.price * item.discountPercentage) / 100
//                               )}{" "}
//                             <label htmlFor="" className="text-green-600">
//                               (Discount price)
//                             </label>
//                           </p>
//                         </div>
//                         <div className="absolute right-20">
//                           <button
//                             className="float-right text-xl"
//                             onClick={() => {
//                               cartClose(item);
//                               toast.success("Product removed from cart");
//                             }}
//                           >
//                             <i class="fa-solid fa-trash"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {cartItems.length === 0 && (
//                     <div className="flex justify-center items-center  text-center text-2xl py-10 px-6 font-semibold text-red-600">
//                       <img src="../empty.svg" alt="" className="w-44 pr-8" />
//                       Your shopping cart is empty...
//                     </div>
//                   )}

//                   <div className=" border h-72 px-5 py-4 mb-1">
//                     <p className="text-xl font-semibold">Total Price:</p>₹
//                     {cartItems.reduce(
//                       (total, item) =>
//                         total +
//                         item.quantity *
//                           (item.price -
//                             parseInt(
//                               (item.price * item.discountPercentage) / 100
//                             )),
//                       0
//                     )}
//                     <p className="text-xl font-semibold">Platform fee:</p>
//                     <p className="text-lg">Free</p>
//                     <p className="text-xl font-semibold">Shipping Charges:</p>
//                     <p className="text-lg">Free</p>
//                     {/* <p className="text-xs">Free shipping for you</p> */}
//                     <br />
//                     <hr />
//                     <p className="text-xl font-bold  mt-4">Total Amount:</p>
//                     <p className="text-lg">
//                       ₹
//                       {cartItems.reduce(
//                         (total, item) =>
//                           total +
//                           item.quantity *
//                             (item.price -
//                               parseInt(
//                                 (item.price * item.discountPercentage) / 100
//                               )),
//                         0
//                       )}
//                     </p>
//                   </div>

//                   <div
//                     className="text-center mt-7 hover:text-blue-950 text-xl underline cursor-pointer"
//                     onClick={() => setIsCartModalOpen(false)}
//                   >
//                     Continue Shopping...
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
