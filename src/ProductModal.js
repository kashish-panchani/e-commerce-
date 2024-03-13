import React from "react";
import { Link } from "react-router-dom";

const ProductModal = (props) => {
  const {
    selectedProduct,
    closeModal,
    selectThumbnail,
    addToCart,
    addedToCart,
    wishlist,
    whishlistbtn,
  } = props;
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white flex justify-center items-center rounded-lg shadow-xl max-w-2xl relative z-10">
            <div className="py-10 px-10">
              <button
                className="float-right pb-9 text-2xl"
                onClick={props.closeModal}
              >
                <i class="fa-solid fa-xmark "></i>
              </button>

              <h2 className="text-3xl font-bold pb-8 ">
                {props.selectedProduct.title}
              </h2>
              <div className="flex justify-center items-center">
                <img
                  src={props.selectedProduct.thumbnail}
                  alt={props.selectedProduct.title}
                  className="object-cover h-96"
                />
              </div>
              <span className="font-semibold">More Images</span>
              <div className="flex items-center mt-5 overflow-x-auto">
                {props.selectedProduct.images.map((v, i) => (
                  <img
                    key={i}
                    src={v}
                    alt="image"
                    className="w-16 h-16 mr-8"
                    onClick={() => props.selectThumbnail(v)}
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed font-semibold pt-1">
                {props.selectedProduct.brand}
              </p>
              <p className="text-base py-2 *:">
                {props.selectedProduct.description}
              </p>
              <div className="flex my-1">
                <p className="text-lg font-bold">
                  <i className="fa-solid fa-indian-rupee-sign pr-1"></i>
                  {props.selectedProduct.price -
                    parseInt(
                      (props.selectedProduct.price *
                        props.selectedProduct.discountPercentage) /
                        100
                    )}
                </p>
                <p className="text-base font-semibold px-3 leading-relaxed text-gray-500 line-through">
                  <i className="fa-solid fa-indian-rupee-sign text-gray-500 text-sm"></i>
                  {props.selectedProduct.price}
                </p>
                <p className="text-base leading-relaxed font-bold text-red-500">
                  ({props.selectedProduct.discountPercentage}% off)
                </p>
              </div>
              <div className="flex">
                <p className="text-lg leading-relaxed mt-4 py-1 w-20 border hover:border-black text-center font-semibold rounded-sm">
                  {props.selectedProduct.rating}
                  <i className="fa-solid fa-star pl-1 text-teal-500"></i>
                </p>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 mt-4 py-1 w-32"
                  onClick={props.addToCart}
                >
                  {props.addedToCart ? (
                    <span>
                      <Link to="/cart">
                        GO TO CART <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </span>
                  ) : (
                    "ADD TO CART"
                  )}
                </button>

                <div
                  className={`border flex justify-center items-center ml-1 px-1 mt-4 py-1 w-36 ${
                    props.wishlist.some(
                      (item) => item.id === props.selectedProduct.id
                    )
                      ? "bg-slate-800 text-white"
                      : ""
                  }`}
                >
                  {props.wishlist.some(
                    (item) => item.id === props.selectedProduct.id
                  ) ? (
                    <i className="fa-solid fa-heart text-rose-600 pl-2 text-2xl"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl"></i>
                  )}
                  <label
                    htmlFor=""
                    className="font-semibold mx-2"
                    onClick={(e) => whishlistbtn(props.selectedProduct.id, e)}
                  >
                    {props.wishlist.some(
                      (item) => item.id === props.selectedProduct.id
                    )
                      ? "WISHLISTED"
                      : "WISHLIST"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
