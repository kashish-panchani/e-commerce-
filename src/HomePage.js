import React, { useEffect, useState } from "react";
import Header from "./Header";
// import banner from "./Images/heroimage.jpg";

import firstpart from "./Images/firstpart.webp";
import secondpart from "./Images/secondpar.webp";
import home1 from "./Images/home1.webp";
import home2 from "./Images/home2.webp";
import home3 from "./Images/home3.webp";
import home4 from "./Images/home5.webp";
import home6 from "./Images/home6.webp";
import footerimg from "./Images/footeimage.webp";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  console.log("products::", products);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=30`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  const addToCart = () => {
    const isAlreadyInCart = cartItems?.some(
      (item) => item.id === selectedProduct.id
    );
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      setAddedToCart(true);
      toast.success("Item added to cart successfully");
    }
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== selectedProduct.id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
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

  return (
    <>
      <Header
        count={count}
        // toggleCartModal={toggleCartModal}
        // searchTerm={searchTerm}
        // handleSearchChange={handleSearchChange}
      />

      <div>
        {/* All products */}
        <Link to="/all">
          <div className="flex pt-10 justify-center items-center ">
            <div>
              <img src={firstpart} alt="" className="" />
            </div>
            <div>
              <img src={secondpart} alt="" className="w-full" />
            </div>
          </div>
        </Link>
        <div>
          <img src={home1} alt="" className="w-full" />
        </div>
        <div>
          <img src={home2} alt="" className="w-full" />
        </div>

        <div className="flex">
          <div>
            <img src={home3} alt="" className="" />
          </div>
          <div>
            <img src={home4} alt="" className="" />
          </div>
        </div>
        <div>
          <img src={home6} alt="" />
        </div>
      </div>

      {/* card */}
      <div className="flex justify-center items-center py-20 text-4xl font-semibold">
        <h1>Deal-icious Offers</h1>
      </div>
      <div class="container  gap-3 mx-auto max-w flex flex-wrap w-full  overflow-hidden bg-white">
        <Link to="/mens-shoes">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792073334814.jpg"
              alt="shoes"
            />
          </div>
        </Link>
        <Link to="/bags">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49733324931102.jpg"
              alt="women-bag"
            />
          </div>
        </Link>
        <Link to="/mens-shirts">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49739179622430.jpg"
              alt="men"
            />
          </div>
        </Link>
        <Link to="/mens-watches">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792074317854.jpg"
              alt="watch"
            />
          </div>
        </Link>
        <Link to="/home-decoration">
          <div class="flex pr-2 h-80 object-cover overflow-hidden">
            <img
              src="https://assets.tatacliq.com/medias/sys_master/images/49792074711070.jpg"
              alt="home decor"
            />
          </div>
        </Link>
      </div>
      <div className="py-20 text-4xl text-center font-semibold">
        <h1>Blockbuster Offers</h1>
      </div>
      <div className=" mx-auto container">
        <div className="gap-5 flex justify-center items-center flex-wrap   bg-white">
          <Link to="/bags">
            <div class="flex  h-3/4  object-cover ">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180343326.jpg"
                alt="women-bag"
              />
            </div>
          </Link>
          <Link to="/womens-watches">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180408862.jpg"
                alt="women-watch"
              />
            </div>
          </Link>
          <Link to="/sunglasses">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180605470.jpg"
                alt="sunglass"
              />
            </div>
          </Link>
          <Link to="/women's shoes">
            <div class="flex  h-3/4  object-cover">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739180736542.jpg"
                alt="shoes"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="my-3">
        <img src={footerimg} alt="" className="w-full" />
      </div>
    </>
  );
};

export default HomePage;
{
  /* <div className=" flex justify-center relative ">
<div className="w-full  ">
  <img src={banner} alt="" className=" w-full" />
</div>
<div className="container mx-auto absolute py-80 w-96  left-28">
  <p className="bghead   text-5xl text-white ">
    Every purchase will be mad e with pleasure.
  </p>
  <p className="bghead flex text-xl my-5 text-white  ">
    We work with global brands and have created an application for you
    to do your shopping.
  </p>
  <div className="container mx-auto py-3 flex justify-center items-center w-screen  bg-white mt-32">
    <p className="mr-10 ">
      You are on myntra.com.You can also shop on myntra india for
      millions of products with fast local delivery.{" "}
      <a href="https://www.myntra.com/online-fashion-store">
        Click here to go to myntra.in
      </a>
    </p>
  </div>
</div>
</div> */
}
// ------------
// <div class="flex w-full  flex-wrap overflow-hidden bg-white">
// {products.map((product) => (
//   <div key={product.id}>
//   <a class="relative flex h-80 w-72 overflow-hidden" href="#">
//   <img
//                       alt={product.title}
//                       className="object-contain object-center"
//                       src={product.thumbnail}
//                     />

//     <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0"></div>
//   </a>
//   <div class="mt-4 pb-5">
//     <a href="#">
//       {/* <h5 class="text-center tracking-tight text-gray-500">
//         Piped Linen Blend Blazer
//       </h5> */}

//     </a>
//     <div class="flex justify-center">
//       <p>
//       {product.category==="smartphones"}
//         <span class="text-sm font-bold text-gray-900">{product.category}</span>
//         <span class="text-sm text-gray-400 line-through">$499</span>
//       </p>
//       </div>

//     </div>
//   </div>

// ))}
// </div>

// =============
// <div>
//         {/* All products */}
//         <div className="">
//           <div className=" flex justify-center items-center">
//             <img src={firstimage} alt="" className="w-full h-full" />
//           </div>
//           <div className="flex justify-center items-center ">
//             <div>
//               <img src={firstpart} alt="" className="" />
//             </div>
//             <div>
//               <img src={secondpart} alt="" className="w-full" />
//             </div>
//           </div>
//           <div>
//             <img src={home1} alt="" className="w-full" />
//           </div>
//           <div>
//             <img src={home2} alt="" className="w-full" />
//           </div>

//           <div className="flex">
//             <div>
//               <img src={home3} alt="" className="" />
//             </div>
//             <div>
//               <img src={home4} alt="" className="" />
//             </div>
//           </div>
//           <div>
//             <img src={home6} alt="" />
//           </div>
//         </div>
//       </div>
