/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const HeartButtonFull = () => {
  

  return (
    <button  className='relative fill-white rounded-full'>
      
        <FaHeart className='
        absolute
        -top-[2px]
        -right-[2px]
        fill-rose-500 hover:fill-rose-400 
        ' size={24} />
    
    </button>
  );
};

export default HeartButtonFull;
