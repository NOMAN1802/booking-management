/* eslint-disable no-unused-vars */
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const Prices = () => {
  return (
    <div className="mt-10 ">
      <div className="bg-[url(https://dance-studio.cmsmasters.net/wp-content/uploads/2015/04/heading-image-1.jpg)] max-h-[100%] pb-16 text-white">
        
         <SectionTitle 
           subHeading={"Choose what suits you best"}
           heading={"Host Package!"}
           >
           </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 container justify-center items-center   mx-auto">
          <div className="border w-[65%] mx-auto mt-10 text-center py-6">
            <p>Basic</p>
            <p className="text-6xl mt-5 text-[#9C4C40]">$ 100</p>
            <ul className="mt-6 space-y-3">
              <li>Add property for booing</li>
              <li>Update property </li>
              <li>Direct conversation with guest</li>
              <li>Get good profit</li>
              <li>Special festival offers</li>
            </ul>
            <button className="bg-[#EA6045] -skew-x-6 px-4 py-2 mt-4 font-semibold text-white hover:scale-110">
              Select
            </button>
          </div>
          {/* second  */}
          <div className="border-none w-[65%] mx-auto  mt-10 text-center py-6 -my-5 bg-[#EA6045] ">
            <p>Optimal</p>
            <p className="text-6xl mt-5 ">$ 200</p>
            <p className="mt-2">Only this month</p>
            <ul className="mt-6 space-y-3">
              <li>Add property for booing</li>
              <li>Update property </li>
              <li>Direct conversation with guest</li>
              <li>Get good profit</li>
              <li>Special festival offers</li>
            </ul>
            <button className="bg-white -skew-x-6 px-4 py-2 mt-4 font-semibold text-black hover:scale-110">
              Select
            </button>
          </div>
          {/* third */}
          <div className="border w-[65%] mx-auto  mt-10 text-center py-6 ">
            <p>Premium</p>
            <p className="text-6xl mt-5 text-[#9C4C40]">$ 300</p>
            <ul className="mt-6 space-y-3">
              <li>Add property for booing</li>
              <li>Update property </li>
              <li>Direct conversation with guests</li>
              <li>Get good good profit</li>
              <li>Special festival offers</li>
            </ul>
            <button className="bg-[#EA6045]  -skew-x-6 px-4 py-2 mt-4 font-semibold text-white hover:scale-110">
              Select
            </button>
          </div>
          {/* fourth  */}
          <div className="border w-[65%] mx-auto  mt-10 text-center py-6 ">
            <p>Gold</p>
            <p className="text-6xl mt-5 text-[#9C4C40]">$ 400</p>
            <ul className="mt-6 space-y-3">
              <li>Add property for booing</li>
              <li>Update property </li>
              <li>Direct conversation with guests</li>
              <li>Get good good profit</li>
              <li>Special festival offers</li>
            </ul>
            <button className="bg-[#EA6045] -skew-x-6 px-4 py-2 mt-4 font-semibold text-white hover:scale-110">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;