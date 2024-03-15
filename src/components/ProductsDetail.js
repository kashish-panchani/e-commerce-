import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

const ProductsDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const storedSelectedProduct = localStorage.getItem("selectedProduct");

    if (storedSelectedProduct) {
      setSelectedProduct(JSON.parse(storedSelectedProduct));
    }
  }, []);

  if (!selectedProduct) {
    return null; 
  }

  return (
    <>
    <Header count={count} />
    <div className="container m-4 flex justify-between">
      <div className="flex w-full">
        <div className="p-5 flex flex-wrap">
          {selectedProduct.images.map((image, index) => (
            <div key={index} className="w-[500px] h-[500px] border m-2">
              <img
                src={image}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10 py-20 w-2/6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{selectedProduct.title}</h1>
          <h1 className="text-gray-400 text-xl font-medium">
            {selectedProduct.description}
          </h1>
          <div className="border border-gary-200 w-1/2 flex justify-evenly">
            {" "}
            {selectedProduct.rating} <span className="opacity-30">|</span>539
            Rating
          </div>
          <div className="border border-gray-300"></div>
        </div>
        <div className="text-4xl font-bold text-black">
          ₹{selectedProduct.price}
          <span className="opacity-40 text-3xl font-normal"> MRP</span>{" "}
        </div>
        <div className="text-teal-600 font-bold text-2xl mr-4 mt-5">
          inclusive of all taxes
        </div>

        <div className="flex flex-row gap-1">
          <button className="rounded-none py-3 px-4 h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32">
            ADD TO BAG
          </button>
       
          <button className="rounded-none py-3 px-4 h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full">
          <i class="fa-regular fa-heart"></i> WISHLIST
          </button>
        </div>
      </div>
    </div>
    <Footer/> 
    </>
  );
};

export default ProductsDetail;
