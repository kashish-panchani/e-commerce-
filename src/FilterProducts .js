import React from "react";

const FilterProducts = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="mx-12 flex items-center">
      <input
        type="text"
        placeholder="Search For Products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-5 text-base py-2 pr-36 border border-r-0 rounded-l-md text-gray-700 focus:outline-none"
      />
      <button className=" border-l-0 px-4 py-2 border rounded-r-md text-gray-300 ">
        <i className="fas fa-search text-base"></i>
      </button>
    </div>
  );
};

export default FilterProducts;
