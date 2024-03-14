import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ProductModal from "../ProductModal";
import Header2 from "../Header2";
import Footer from "../Footer";
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
    <div className=" bg-gray-100">
 <Header2 count={count}/>
      {isModalOpen && selectedProduct && (
        <ProductModal
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
            <h1 className="pt-44 flex justify-center items-center font-semibold text-3xl">
              YOUR WISHLIST IS EMPTY
            </h1>
            <p className="flex justify-center items-center text-3xl text-gray-500 py-5">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <div className="flex items-center justify-center">
              <img src="../empty-wishlist.png" className=" py-10" />
            </div>
            <div className="flex justify-center items-center ">
              <button className=" text-blue-600 text-2xl font-bold border rounded-lg border-blue-800 my-10 py-6 px-8 cursor-pointer">
                <Link to="/">CONTINUE SHOPPING</Link>
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
