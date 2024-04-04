import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      navigate(`/SearchProduct/${searchTerm}`);
    }
  };
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
      setCount(parsedCartItems.length);
    }
  }, [cartItems]);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //   setCount(cartItems.length);
  // }, [cartItems]);
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };
  return (
    <>
      <header
        className="overflow-hidden
    bg-white shadow-md w-full z-10 fixed"
      >
        <nav className="overflow-hidden bg-white dark:bg-gray-900 sm:container sm:mx-auto  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className=" max-w-full xl:max-w-[1218px] lg:max-w-[1000px] md:max-w-[770px] sm:max-w-[633px] flex flex-wrap justify-between items-center  sm:mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="../myntralogo.png"
                className="h-8  xl:h-14 lg:h-[40px] md:h-[32px] sm:h-[40px]"
                alt="myntra Logo"
              />
            </Link>
            <div className="flex justify-center items-center sm:flex sm:justify-center sm:items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="flex items-center  sm:mx-5">
                <input
                  type="text"
                  placeholder="Search For Products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={searchEnter}
                  className=" h-7 pl-4 w-[114px] text-[9px] border border-r-0  sm:text-sm sm:w-[300px] sm:h-8 sm:text-[12px]   lg:w-[290px] lg:h-8 md:w-[150px] md:h-[29px] lg:text-[12px]  xl:text-[15px] md:text-[11px]  xl:w-[360px]   xl:text-sm rounded-l-md text-gray-700 focus:outline-none   xl:h-10"
                />
                <button className=" border-l-0 w-10 h-7 sm:h-8 xl:h-10  lg:h-8 md:w-[35px] md:h-[29px] border rounded-r-md text-gray-300 ">
                  <i className="fas fa-search text-xs xl:text-[16px]  "></i>
                </button>
              </div>

              <div className="flex text-[12px] xl:text-xl  lg:text-[16px]  md:text-[12px] sm:text-[17px]">
                <div>
                  <Link to="/login">
                    <i class="fa-regular fa-user"></i>
                  </Link>
                </div>

                <Link
                  to="/wishlist"
                  className="text-gray-700  hover:text-gray-900"
                >
                  <i className="far fa-heart mx-3  sm:mx-3 xl:mx-4 lg:mx-[12px] md:mx-[11px] "></i>
                </Link>

                <div className="relative ">
                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <i className="fas fa-shopping-cart "></i>
                    <span className="absolute bottom-3 right-2 text-[8px] w-3 h-3 bg-red-500 text-white rounded-full  xl:w-4 xl:h-4 xl:bottom-5 xl:right-4  xl:text-[11px] sm:w-4 sm:h-4 sm:bottom-4 sm:right-3 sm:text-[11px]  lg:w-[13px] lg:h-[13px] lg:right-3 lg:text-[9px] lg:bottom-4 md:bottom-[12px] md:right-[7px] md:text-[8px] md:w-3 md:h-3 flex items-center justify-center ">
                      {count}
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center p-2 w-8 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } items-center justify-center w-full md:flex md:text-xs md:w-auto  md:order-1`}
              id="navbar-sticky"
            >
              <ul className=" navbar flex flex-col p-4 xl:text-[14px] lg:text-[12px] md:text-[11px] mt-4 font-medium   border border-gray-100 rounded-lg bg-gray-50 md:space-x-4    xl:space-x-7 lg:space-x-6   md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/all"
                    className="block py-2 px-3  text-white bg-gray-400 rounded md:bg-transparent  md:text-gray-900 md:p-0 md:dark:text-gray-500"
                    aria-current="page"
                  >
                    ALL
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CategoryFilter/smartphones"
                    className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-400 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    SMARTPHONES{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CategoryFilter/womens-bags"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    BAG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CategoryFilter/sunglasses"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-400 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    SUNGLASSES
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/CategoryFilter/womens-jewellery"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-400 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    JEWELLERY
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/CategoryFilter/laptops"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    LAPTOP
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
