import React from "react";

const SearchFilterProducts = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="flex items-center  sm:mx-5">
      <input
        type="text"
        placeholder="Search For Products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className=" h-7 pl-4 w-[114px] text-[9px] border border-r-0  sm:text-sm sm:w-[300px] sm:h-8 sm:text-[12px]   lg:w-[290px] lg:h-8 md:w-[150px] md:h-[29px] lg:text-[12px]  xl:text-[15px] md:text-[11px]  xl:w-[360px]   xl:text-sm rounded-l-md text-gray-700 focus:outline-none   xl:h-10"
      />
      <button className=" border-l-0 w-10 h-7 sm:h-8 xl:h-10  lg:h-8 md:w-[35px] md:h-[29px] border rounded-r-md text-gray-300 ">
        <i className="fas fa-search text-xs xl:text-[16px]  "></i>
      </button>
    </div>
  );
};

export default SearchFilterProducts;
