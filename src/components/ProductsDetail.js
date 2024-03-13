import React from "react";

const ProductsDetail = (props) => {
  const {
    setSelectedProductNew,
    selectThumbnail,
    addToCart,
    addedToCart,
    wishlist,
    whishlistbtn,
  } = props;

  console.log(
    "selectThumbnail::",
    selectThumbnail,
    setSelectedProductNew,
    props
  );
  return (
    <div className="container m-auto flex w-full flex-row gap-10 border border-blue-500 justify-center">
      <div className="border border-black">
        {" "}
        <div className="flex items-center mt-5 overflow-x-auto">
          {props?.setSelectedProductNew?.images?.map((v, i) => (
            <img
              key={i}
              src={v}
              alt="image"
              className="w-16 h-16 mr-8"
              onClick={() => props.selectThumbnail(v)}
            />
          ))}
        </div>
      </div>
      <div className="border border-black">frewrew</div>
    </div>
  );
};

export default ProductsDetail;
