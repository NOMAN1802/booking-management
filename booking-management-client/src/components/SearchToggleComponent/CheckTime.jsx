/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CheckInCalendar from "./Calender";

const CheckTime = ({ props }) => {
  const { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate } =
    props || {};

  const handleCheckInDates = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="mt-[20px] bg-white max-w-full py-5 px-5 drop-shadow-2xl rounded-3xl">
      <CheckInCalendar
        checkOutDate={checkOutDate}
        handleCheckOutDate={handleCheckOutDate}
        checkInDate={checkInDate}
        handleCheckInDates={handleCheckInDates}
      />
    </div>
  );
};

export default CheckTime;