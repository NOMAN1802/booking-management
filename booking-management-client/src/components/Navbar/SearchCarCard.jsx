/* eslint-disable no-unused-vars */
import React from 'react';
import HeartButton from '../Button/HeartButton';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { FaCar, FaWifi } from 'react-icons/fa';
import { FaRadio } from 'react-icons/fa6';
import { MdAirlineSeatReclineExtra, MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';

const SearchCarCard = ({car}) => {
    return (
      
      <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
      <Link to={`/car/${car._id}`}>
        <img src={car.image} alt=""
          className='w-full h-52 object-cover	' />
      </Link>
     

      
      <div className='absolute'>
        <p className="relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white">
          {car?.type}
        </p>
      </div>


      <div className='flex flex-col items-start my-2 py-2 space-y-2'>

        <div className='font-semibold text-lg text-slate-500  mx-2'>{car?.title}
        </div>

        <div className='flex flex-row items-center justify-between'>
          <p className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'><MdOutlineAirlineSeatReclineNormal /> {car?.total_seat}</p>
          <div className='flex flex-wrap gap-4'>
            {car?.facilities?.map((facility, index) => (
              <div key={index} className='flex items-center gap-2 group'>
                {facility === 'wifi' && (
                  <div className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
                    <FaWifi />
                  </div>
                )}
                {facility === 'parking' && (
                  <div className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
                    <FaCar />
                  </div>
                )}
                {facility === 'radio' && (
                  <div className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
                    <FaRadio />
                  </div>
                )}
                {facility === 'airBag' && (
                  <div className='mx-2 flex flex-row items-center justify-between gap-2 text-sm'>
                    <MdAirlineSeatReclineExtra />
                  </div>
                )}
              </div>
            ))}

          </div>

        </div>
        <div className='flex flex-row justify-end'>
          <div className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-2 mx-2'>
            <FiMapPin size={10} /> {car.location}
          </div>
          <div className='absolute bottom-3 right-2'>
            <p className='relative text-[#20b759]  text-lg'>${car.price}<span className='text-xs px-2'>/day</span></p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default SearchCarCard;