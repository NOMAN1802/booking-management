/* eslint-disable no-unused-vars */
import React from 'react';
import HeartButton from '../Button/HeartButton';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

const CarCard = ({result}) => {
    return (
        <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
        <img src={result.image} alt=""
          className='w-full h-52 object-cover	' />
        <div
          className='
          absolute
          top-3
          right-3
        '
        >
          <HeartButton 
           />
        
        </div>
  
        <div className='absolute'>
        <p className="relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white">
                  {result.type}
          </p>
        </div>
        <div className='flex flex-col items-start my-2 py-2 space-y-2'>
          {/* <Rating className='mx-2'
                                  style={{ maxWidth: 80 }}
                                  value={result.rating}
                                  readOnly
                              /> */}
          <span className='font-semibold text-lg text-slate-500  mx-2'>{result.title}</span>
          <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10} /> {result.location}</span>
          <div className='flex flex-row space-x-32'><div><p className='font-body text-[#20b759] mx-2'>${result.price}<span className='text-xs px-2'>/day</span> </p></div>  
            <div className='grow-1'>
              <Link to={`/car/${result._id}`}><button className='bg-slate-500 p-1 rounded text-white text-sm'>
                    View details</button> </Link>
                    
            </div>
          </div>
        </div>
      </div>
    );
};

export default CarCard;