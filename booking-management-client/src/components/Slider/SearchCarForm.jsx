/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineLocationCity } from 'react-icons/md';
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Loader from "../Shared/Loader";
import MatchCar from "./MatchCar";
import EmptyCarSearch from "./EmptyCarSearch";
import CheckTime from "../SearchToggleComponent/CheckTime";
import { formateDate } from "../../utils/dateConvert";

const SearchCarForm = ({ setIsCarOpen }) => {

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const props = { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate };
  const [find, setFind] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchCars, setSearchCars] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [active, setActive] = useState(null);

  const handleToggle = (e, find) => {
    e.preventDefault();
    [find].map((type) => setActive(type));
    setFind(find);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const checkIn = checkInDate ? checkInDate.toISOString() : '';
    const checkOut = checkOutDate ? checkOutDate.toISOString() : '';

    const searchQuery = {
      location: location,
      checkIn,
      checkOut,
    };

    const queryString = Object.keys(searchQuery)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchQuery[key])}`
      )
      .join('&');

    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:5000/carSearch?${queryString}`);

      if (response.data.length === 0) {
        console.log('No results found or data format is incorrect');
        setSearchCars([]);
      } else {
        console.log('else', response.data);
        setSearchCars(response.data);
      }

      setSearchPerformed(true);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching filtered data:', error);
      setLoading(false);
    }
  };
  return (
    <>
    {loading ? (
      <Loader />
    ) : searchPerformed && searchCars.length === 0 ? (
      <EmptyCarSearch setIsCarOpen={setIsCarOpen}/>
    ) : (
      <MatchCar searchCars={searchCars} setIsCarOpen={setIsCarOpen} />
    )}

    <div className="cursor-pointer pt-7 z-10">
      <form
        onSubmit={handleSubmit}
        className={`w-[750px] border mt-10 grid grid-cols-9 bg-gray-100 z-20 border-l-2`}
      >
        <div
          onClick={(e) => handleToggle(e, "location")}
          className={` px-2 py-2 ${active == "location"
            ? "bg-white shadow-2xl  "
            : "hover:bg-[#EBEBEB]"
            }   border-r-2 col-span-3 `}
        >
          <div className="flex  gap-10 items-center  ">
            <div>
              <p className="text-[13px] font-bold flex items-center gap-2"><MdOutlineLocationCity size={18}/>  Location</p>
              <input
                className={` placeholder-gray-400 outline-none bg-transparent bg-[#EBEBEB] text-sm  ${active == "location" && "bg-white "
                  }`}
                name="location"
                placeholder="Search locations"
              />
            </div>
          </div>
        </div>
        <div
          onClick={(e) => handleToggle(e, "checkIn")}
          className={` px-2 py-2 ${active == "checkIn"
            ? "bg-white shadow-2xl hover:bg-white  "
            : "hover:bg-[#EBEBEB]"
            }   border-r-2   col-span-2`}
        >
          <div className="flex  gap-10 items-center  ">
            <div>
              <p className="text-[13px] font-bold flex items-center gap-2"><FaRegCalendarAlt size={18}/> Check in</p>
              <p className="text-gray-500 text-sm ">
                {checkInDate ? (
                  <p className="font-semibold text-black">
                    {formateDate(checkInDate)}
                  </p>
                ) : (
                  "Add dates"
                )}
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => handleToggle(e, "checkOut")}
          className={` px-2 py-2 ${active == "checkOut"
            ? "bg-white shadow-2xl hover:bg-white  "
            : "hover:bg-[#EBEBEB]"
            }   border-r-2  col-span-2 `}
        >
          <div className="flex  gap-10 items-center  ">
            <div>
              <p className="text-[13px] font-bold flex items-center gap-2"> <FaRegCalendarAlt size={18}/> Check out</p>
              <p className="text-gray-500 text-sm ">
                {checkOutDate ? (
                  <p className="font-semibold text-black">
                    {formateDate(checkOutDate)}
                  </p>
                ) : (
                  "Add dates"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="border-l-2 text-lg pr-2 bg-slate-500  text-gray-100 flex flex-row P-2  items-center gap-2 col-span-2">

          <BiSearch size={20}></BiSearch>
          <button type="submit">Search</button>
        </div>

      </form>
    </div>
    <div className="z-50">
      {find == "checkIn" && <CheckTime props={props} />}
      {find == "checkOut" && <CheckTime props={props} />}
    </div>
  </>
  );
};

export default SearchCarForm;
