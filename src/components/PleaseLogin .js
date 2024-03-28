import React from 'react'
import { Link } from 'react-router-dom';
import imagelogin from "../Images/login.png"
const PleaseLogin  = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 sm:py-32">
          <h1 className="sm:text-xl font-bold mb-4">PLEASE LOG IN</h1>
          <p className="text-gray-400 sm:text-lg  text-xs ">
          Login to view items in your wishlist.
          </p>
          <div className='sm:py-10 py-7 '>
          <img src={imagelogin} alt="PLEASELOGIN"  className='sm:h-24 h-16  ' />
          </div>
          <Link to="/login" className="border font-semibold text-[10px] py-2 px-6  sm:text-lg border-blue-600 text-blue-600 sm:py-2 sm:px-9   rounded">
            LOGIN
          </Link>
        </div>
      );
}

export default PleaseLogin 
