/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { PiBathtubThin, PiUsersThreeLight } from 'react-icons/pi';
import { LiaBedSolid } from 'react-icons/lia';

const SearchRoomCard = ({room}) => {
    return (
    
      <div className='rounded overflow-hidden shadow-xl transform hover:scale-110 duration-100'>
      <Link to={`/room/${room._id}`}>
        <img src={room.image} alt="" className='w-full h-52 object-cover' />
      </Link>


      <div className='absolute'>
        <p className='relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white'>
          {room?.type}
        </p>
      </div>
      <div className='flex flex-col items-start my-2 py-2 space-y-2'>
        <div>
          <span className='font-semibold text-lg text-slate-500 mx-2'>
            {room.title}
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <p className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
            <PiUsersThreeLight /> {room?.total_guest}
          </p>
          <p className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
            <LiaBedSolid /> {room?.bedrooms}
          </p>
          <p className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
            <PiBathtubThin /> {room?.bathrooms}
          </p>
        </div>

        <div className='flex flex-row justify-end'>
          <div className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-2 mx-2'>
            <FiMapPin size={10} /> {room.location}
          </div>
          <div className='absolute bottom-3 right-2'>
            <p className='relative text-[#20b759] text-lg'>
              ${room.price}
              <span className='text-xs px-2'>/night</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default SearchRoomCard;