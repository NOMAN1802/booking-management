import React from 'react';
import { FaWifi,  FaTv, FaCar, FaPaw } from 'react-icons/fa';

const RoomInfo = ({ roomData }) => {
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className='
              text-xl 
              font-semibold 
              flex 
              flex-row 
              items-center
              gap-2
            '
        >
          <div>Hosted by {roomData?.host?.name}</div>

          <img
            className='rounded-full'
            height='30'
            width='30'
            alt='Avatar'
            src={roomData?.host?.image}
          />
        </div>
        <div
          className='
              flex 
              flex-row 
              items-center 
              gap-4 
              font-light
              text-neutral-500
            '
        >
          <div>Total guest: {roomData?.total_guest}</div>
          <div>Bed rooms: {roomData?.bedrooms}</div>
          <div>Bath rooms: {roomData?.bathrooms}</div>
        </div>
      </div>

      <hr />

      <div className='text-lg font-light text-neutral-500'>
        {roomData?.description}
      </div>

      <hr />

       <div className='flex flex-wrap gap-4'>
        {roomData.facilities.map((facility, index) => (
          <div key={index} className='flex items-center gap-2 group'>
            {facility === 'wifi' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Wifi <FaWifi />
              </div>
            )}
            {facility === 'parking' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Parking <FaCar />
              </div>
            )}
            {facility === 'tv' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                TV <FaTv />
              </div>
            )}
            {facility === 'pets' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Pets <FaPaw />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomInfo;
