import React from "react";
import { Link } from "react-router-dom";
import FilterProducts from "./FilterProducts ";

const Header = ({ count, searchTerm, handleSearchChange }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="mx-14 h-20 flex justify-between items-center ">
        <Link to="/" className="flex items-center justify-center">
          <img src="../myntralogo.png" className="w-28 mt-2" alt="Logo" />
        </Link>
        <div className="space-x-10 mr-32 font-semibold">
          <Link to="/all" className="nav-link">
            ALL
          </Link>
          <Link to="/smartphones" className="nav-link">
            SMARTPHONES
          </Link>
          <Link to="/bags" className="nav-link">
            BAG
          </Link>
          <Link to="/sunglasses" className="nav-link">
            SUNGLASSES
          </Link>
          <Link to="/jewellery" className="nav-link">
            JEWELLERY
          </Link>
          <Link to="/lapto" className="nav-link">
            LAPTOP
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div>
            <FilterProducts
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <Link to="/login">
            <i class="fa-regular fa-user text-xl "></i>
          </Link>
          <div className="relative">
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
              <i className="far fa-heart text-2xl"></i>
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-gray-900">
              <i className="fas fa-shopping-cart text-2xl "></i>
              <span className="absolute bottom-6  bg-red-500 text-white rounded-full right-5 w-5 h-5 flex items-center justify-center text-xs">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
