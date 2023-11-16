/* eslint-disable no-unused-vars */
import { useState } from "react";

const AddGuest = ({
  totalGuests,
  setGuestCount,
  guestCount,
  setTotalGuest,
}) => {


  const handleIncrement = (type) => {
    setGuestCount((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    if (guestCount[type] > 0) {
      setGuestCount((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] - 1,
      }));
    }
  };

  const total =
    guestCount.Adults +
    guestCount.Children +
    guestCount.Infants +
    guestCount.Pets;

  if (total >= 0) {
    setTotalGuest(total);
  }

  return (
    <div className="mt-[20px]   w-4/6 bg-white ml-auto py-5 px-5 drop-shadow-2xl rounded-3xl z-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="pt-4 ">Adults</p>
          <p className={` pb-7`}>Ages 13 or above</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement("Adults")}
            className="border inline px-3 py-2 rounded-full"
          >
            -
          </button>
          <p>{guestCount?.Adults}</p>
          <button
            onClick={() => handleIncrement("Adults")}
            className="border inline px-3 py-2 rounded-full"
          >
            +
          </button>
        </div>
      </div>
      <hr className="" />
      <div className="flex justify-between items-center">
        <div>
          <p className="pt-4 ">Children</p>
          <p className={` pb-7`}>Ages 2-12</p>
        </div>
        <div className="flex items-center gap-3">
          <button
          disabled={guestCount.Children == 0}
            onClick={() => handleDecrement("Children")}
            className="border inline px-3 py-2 rounded-full"
          >
            -
          </button>
          <p>{guestCount?.Children}</p>
          <button
            onClick={() => handleIncrement("Children")}
            className="border inline px-3 py-2 rounded-full"
          >
            +
          </button>
        </div>
      </div>
 
      <hr /> */}
    </div>
  );
};

export default AddGuest;