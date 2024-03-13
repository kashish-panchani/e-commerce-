import React from "react";

const FilterProducts = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="mx-12 text-2xl flex items-center">
      <input
        type="text"
        placeholder="Search For Products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-5 py-3 pr-36 bg-gray-600 text-white focus:outline-none"
      />
      <button className=" border-l-0 px-5 py-3 bg-gray-600 text-white">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default FilterProducts;
