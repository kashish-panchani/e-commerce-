// WishlistPage.js
import React from "react";

const WishlistPage = ({ wishlist, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white flex justify-center items-center  rounded-lg shadow-xl max-w-2xl relative z-10">
          <div className="py-10 px-10">
            <button
              className="float-right pb-9 text-2xl"
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h2 className="text-3xl font-bold pb-8 ">Wishlist</h2>
            {wishlist.length > 0 ? (
              <div>
                {wishlist.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    {/* Add more details if needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
