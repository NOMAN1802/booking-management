/* eslint-disable no-unused-vars */
import React from "react";
import { Calendar } from "react-date-range";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // January is 0-based
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CheckInCalendar = ({
  checkOutDate,
  handleCheckOutDate,
  checkInDate,
  handleCheckInDates,
}) => {
  return (
    <div className="flex justify-center gap-5">
      <div>
        <p className="text-gray-600 text-sm text-center font-semibold">
          Check In Date
        </p>
        <Calendar
          dateDisplayFormat={"MMM d"}
          date={checkInDate}
          onChange={(selectedDate) =>
            handleCheckInDates(
              selectedDate,
              selectedDate ? formatDate(selectedDate) : ""
            )
          }
        />
      </div>

      <div>
        <p className="text-gray-600 text-sm text-center font-semibold">
          Check Out Date
        </p>
        <Calendar
          date={checkOutDate}
          onChange={(selectedDate) =>
            handleCheckOutDate(
              selectedDate,
              selectedDate ? formatDate(selectedDate) : ""
            )
          }
        />
      </div>
    </div>
  );
};

export default CheckInCalendar;
