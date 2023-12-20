/* eslint-disable no-unused-vars */
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { deleteWishList } from '../../api/wishList';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const WishCard = ({ list, fetchWishList }) => {

  const handleRoomDelete = (id, roomId) => {
    deleteWishList(id).then(data => {
      console.log(data);
      fetchWishList()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Remove from Wish List",
        showConfirmButton: false,
        timer: 1500,
      });
      // Add logic to remove the specific wishlist item from localStorage
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        const updatedWishlist = parsedWishlist.filter((item) => item.roomId !== roomId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    });
  }
  const handleCarDelete = (id, carId) => {
    deleteWishList(id).then(data => {
      console.log(data);
      fetchWishList()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Remove from Wish List",
        showConfirmButton: false,
        timer: 1500,
      });
      // Add logic to remove the specific wishlist item from localStorage
      const storedWishlist = localStorage.getItem('CarWishlist');
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        const updatedWishlist = parsedWishlist.filter((item) => item.carId !== carId);
        localStorage.setItem('CarWishlist', JSON.stringify(updatedWishlist));
      }
    });
  }
  const handleBlogDelete = (id, blogId) => {
    deleteWishList(id).then(data => {
      console.log(data);
      fetchWishList()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Remove from Wish List",
        showConfirmButton: false,
        timer: 1500,
      });
      // Add logic to remove the specific wishlist item from localStorage
      const storedWishlist = localStorage.getItem('blogWishlist');
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        const updatedWishlist = parsedWishlist.filter((item) => item.blogId !== blogId);
        localStorage.setItem('blogWishlist', JSON.stringify(updatedWishlist));
      }
    });
  }
  return (
    <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>


      {
        list.roomId ? (
          <Link to={`/room/${list.roomId}`}>
            <img src={list.image} alt="" className="w-full h-52 object-cover" />
          </Link>
        ) : list.carId ? (
          <Link to={`/car/${list.carId}`}>
            <img src={list.image} alt="" className="w-full h-52 object-cover" />
          </Link>
        ) : (
          <Link to={`/blog/${list.blogId}`}>
            <img src={list.image} alt="" className="w-full h-52 object-cover" />
          </Link>
        )
      }

      {list.roomId ? (
        <div
          className='
          absolute
          top-3
          right-3' >
          <div
            onClick={() => handleRoomDelete(list._id, list.roomId)}
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
        </div>) : list.carId ? (

          <div
            className='
  absolute
  top-3
  right-3' >
            <div
              onClick={() => handleCarDelete(list._id, list.carId)}
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

        ) : list.blogId ?(

          <div
            className='
  absolute
  top-3
  right-3' >
            <div
              onClick={() => handleBlogDelete(list._id, list.blogId)}
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

        ) : null
    
    }

      <div className='absolute'>
        <p className="relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white">
          {list?.type}
        </p>
      </div>
      <div className='flex flex-col items-start my-2 py-2 space-y-2'>

        <span className='font-semibold text-lg text-slate-500  mx-2'>{list?.title}</span>
        <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10} /> {list?.location}</span>
        <div className='font-light text-neutral-500'>
          {list.dateRange}
        </div>
        <div className='flex flex-row space-x-32'>
          <div>
            <p className='font-body text-[#20b759] mx-2'>${list?.price}<span className='text-xs px-2'>/nignt</span> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;