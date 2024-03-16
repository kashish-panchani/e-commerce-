import React from "react";

const FilterProducts = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search For Products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className=" text-base w-full h-10 pl-5 pr-36 border border-r-0 rounded-l-md text-gray-700 focus:outline-none"
      />
      <button className=" border-l-0 w-10 h-10 border rounded-r-md text-gray-300 ">
        <i className="fas fa-search text-base"></i>
      </button>
    </div>
  );
};

export default FilterProducts;
