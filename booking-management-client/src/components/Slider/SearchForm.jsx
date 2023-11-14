/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Destination from "../SearchToggleComponent/Destination";
import CheckTime from "../SearchToggleComponent/CheckTime";
import AddGuest from "../SearchToggleComponent/AddGuest";
import { formateDate } from "../../utils/dateConvert";

const SearchForm = ({ setRooms, setIsOpen }) => {
  const [activeSearch, setActiveSearchText] = useState(false);
  const [totalGuests, setTotalGuest] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState({
    Adults: 0,
    Children: 0,
    Infants: 0,
    Pets: 0,
  });

  const props = { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate };
  const [find, setFind] = useState(null);
  const lists = [
    {
      title: "Stays",
    },
    {
      title: "Experience",
    },
    {
      title: "Online Experience",
    },
  ];

  const [active, setActive] = useState(null);

  const handleToggle = (find) => {
    [find].map((type) => setActive(type));
    setFind(find);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const destination = form.destination.value;
    const checkIn = checkInDate ? checkInDate.toISOString() : "";
    const checkOut = checkOutDate ? checkOutDate.toISOString() : "";
    const guestTotal = totalGuests;

    const searchQuery = {
      location: destination,
      checkIn,
      checkOut,
      guest: guestTotal,
    };
    const queryString = Object.keys(searchQuery)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchQuery[key])}`
      )
      .join("&");

    fetch(
      `http://localhost:5000/rooms/search?${queryString}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  };

  return (
    <>
      <div className="cursor-pointer pt-7  z-10">
        <ul
          onClick={() => setIsOpen(false)}
          className="flex gap-10 justify-center "
        >
          {lists.map((list, index) => (
            <li
              className="text-[16px]  text-gray-900 hover:text-gray-400 hover:border-b-2"
              key={index}
            >
              {list.title}
            </li>
          ))}
        </ul>

        <form
          onClick={() => setActiveSearchText(true)}
          className={` rounded- w-[850px]  border mt-10 grid grid-cols-11    bg-gray-100 z-20 `}
          onSubmit={handleSubmit}
        >
          <div
            onClick={() => handleToggle("destination")}
            className={` px-4 py-3 ${
              active == "destination"
                ? "bg-white shadow-2xl  "
                : "hover:bg-[#EBEBEB]"
            }   rounded-3xl col-span-4 `}
          >
            <div className="flex  gap-10 items-center  ">
              <div>
                <p className="text-[13px] font-bold">Where</p>

                <input
                  className={` placeholder-gray-400 outline-none bg-transparent bg-[#EBEBEB] text-sm  ${
                    active == "destination" && "bg-white "
                  }`}
                  // className="outline-none bg-transparent w-full text-gray-600 placeholder-gray-400"
                  name="destination"
                  placeholder="Search destinations"
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => handleToggle("checkIn")}
            className={` px-4 py-3 ${
              active == "checkIn"
                ? "bg-white shadow-2xl hover:bg-white  "
                : "hover:bg-[#EBEBEB]"
            }   rounded-3xl  col-span-2`}
          >
            <div className="flex  gap-10 items-center  ">
              <div>
                <p className="text-[13px] font-bold"> Check in</p>
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
            onClick={() => handleToggle("checkOut")}
            className={` px-4 py-3 ${
              active == "checkOut"
                ? "bg-white shadow-2xl hover:bg-white  "
                : "hover:bg-[#EBEBEB]"
            }   rounded-3xl col-span-2 `}
          >
            <div className="flex  gap-10 items-center  ">
              <div>
                <p className="text-[13px] font-bold">Check out</p>
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
          <div
            onClick={() => handleToggle("guest")}
            className={` px-4 py-3 ${
              active == "guest"
                ? "bg-white shadow-2xl hover:bg-white  "
                : "hover:bg-[#EBEBEB]"
            }   rounded-3xl flex gap-5 items-center col-span-3 `}
          >
            <div className="flex  gap-10 items-center  ">
              <div>
                <p className="text-[13px] font-bold">Who</p>
                <p className="text-gray-500 text-sm">
                  {totalGuests ? (
                    <p className="font-semibold text-black text-sm">
                      {totalGuests} guests
                    </p>
                  ) : (
                    "AddGuest"
                  )}
                </p>
              </div>
              {/* {totalGuests && (
              <button
                onClick={() => setTotalGuest('')}
                style={{ borderRadius: "50%" }}
                className="bg-[#DDDDDD]   text-sm py-1 px-2 hover:bg-gray-200"
              >
                X
              </button>
            )} */}
            </div>
            <div className=" bg-[#F62E56]  font-semibold rounded-full px-2 py-1 text-white flex  justify-between  ">
              <div>
                <BiSearch size={26}></BiSearch>
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="z-50">
        {find == "destination" && <Destination></Destination>}
        {find == "checkIn" && <CheckTime props={props} />}
        {find == "checkOut" && <CheckTime props={props} />}
        {find == "guest" && (
          <AddGuest
            totalGuests={totalGuests}
            setTotalGuest={setTotalGuest}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
          ></AddGuest>
        )}
      </div>
    </>
  );
};

export default SearchForm;