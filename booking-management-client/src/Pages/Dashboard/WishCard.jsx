/* eslint-disable no-unused-vars */
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { deleteWishList } from '../../api/wishList';
import Swal from 'sweetalert2';

const WishCard = ({list ,fetchWishList}) => {

    const handleDelete = id =>{
        deleteWishList(id).then(data =>{
            console.log(data);
            fetchWishList()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: "Remove from Wish List",
              showConfirmButton: false,
              timer: 1500,
            });
        })
    }
    return (
        <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
        <img src={list.image} alt=""
          className='w-full h-52 object-cover	' />
        <div
          className='
          absolute
          top-3
          right-3
        '
        >
           <div
      onClick={() => handleDelete(list._id)}
      className='
        relative
        hover:opacity-80
        transition
        cursor-pointer
      '
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillHeart
        size={24}
        className='fill-neutral-500/70 hover:fill-rose-500'
      />
    </div>
        
        </div>
  
        <div className='absolute'>
        <p className="relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white">
                  {list?.type}
          </p>
        </div>
        <div className='flex flex-col items-start my-2 py-2 space-y-2'>
          {/* <Rating className='mx-2'
                                  style={{ maxWidth: 80 }}
                                  value={list.rating}
                                  readOnly
                              /> */}
          <span className='font-semibold text-lg text-slate-500  mx-2'>{list?.title}</span>
          <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10} /> {list?.location}</span>
          <div className='font-light text-neutral-500'>
            {list.dateRange}
          </div>
          <div className='flex flex-row space-x-32'><div><p className='font-body text-[#20b759] mx-2'>${list?.price}<span className='text-xs px-2'>/nignt</span> </p>
          </div>
          </div>
        </div>
      </div>
    );
};

export default WishCard;