  import React, { useState } from 'react'
import Header from './Header'

const ErrorPage = () => {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
     <Header
        count={count}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div className='h-96 flex justify-center items-center  text-sm sm:text-xl font-semibold'>
      <h1>page not found</h1>
      </div>
    </div>
  )
}

export default ErrorPage
