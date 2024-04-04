import React from "react";
import firstpart from "../Images/firstpart.webp";
import secondpart from "../Images/secondpar.webp";
import home1 from "../Images/home1.webp";
import home2 from "../Images/home2.webp";
import home3 from "../Images/home3.webp";
import home4 from "../Images/home5.webp";
import home6 from "../Images/home6.webp";
import footerimg from "../Images/footeimage.webp";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <div className="container mx-auto">
          <Link to="/all">
            <div className="flex pt-20 justify-center items-center ">
              <div>
                <img src={firstpart} alt="" className="" />
              </div>
              <div>
                <img src={secondpart} alt="" className="w-full" />
              </div>
            </div>
          </Link>
          <div>
            <img src={home1} alt="" className="w-full" />
          </div>
          <div>
            <img src={home2} alt="" className="w-full" />
          </div>

          <div className="flex">
            <div>
              <img src={home3} alt="" className="" />
            </div>
            <div>
              <img src={home4} alt="" className="" />
            </div>
          </div>
          <div>
            <img src={home6} alt="" />
          </div>
        </div>

        <div className="flex justify-center items-start py-10 text-sm  sm:text-2xl font-semibold">
          <h1>MEDAL WORTHY BRANDS TO BAG</h1>
        </div>
        <div class="container gap-3 mx-auto max-w flex w-full justify-center items-center flex-wrap  sm:flex-wrap   overflow-hidden bg-white">
          <Link to="/CategoryFilter/mens-shoes">
            <div class="flex pr-2 h-80 object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792073334814.jpg"
                alt="shoes"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/womens-bags">
            <div class="flex pr-2 h-80 object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49733324931102.jpg"
                alt="women-bag"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/mens-shirts">
            <div class="flex pr-2 h-80 object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739179622430.jpg"
                alt="men"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/mens-watches">
            <div class="flex pr-2 h-80 object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792074317854.jpg"
                alt="watch"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/home-decoration">
            <div class="flex pr-2 h-80 object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792074711070.jpg"
                alt="home decor"
              />
            </div>
          </Link>
        </div>
        <div className="py-10 text-sm sm:text-2xl text-center font-semibold">
          <h1>Blockbuster Offers</h1>
        </div>
        <div className=" mx-auto container">
          <div className="gap-5 flex justify-center items-center flex-wrap   bg-white">
            <Link to="/CategoryFilter/womens-bags">
              <div class="flex  h-3/4 object-cover ">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180343326.jpg"
                  alt="women-bag"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/womens-watches">
              <div class="flex  h-3/4  object-cover">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180408862.jpg"
                  alt="women-watch"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/sunglasses">
              <div class="flex  h-3/4  object-cover">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180605470.jpg"
                  alt="sunglass"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/womens-shoes">
              <div class="flex  h-3/4  object-cover">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180736542.jpg"
                  alt="shoes"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="my-3">
          <img src={footerimg} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
