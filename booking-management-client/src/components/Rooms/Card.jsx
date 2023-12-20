import { Link } from 'react-router-dom';
import HeartButton from '../Button/HeartButton';
import { FiMapPin } from 'react-icons/fi';
import '@smastrom/react-rating/style.css';
import { getWishList, roomWishList } from '../../api/wishList';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { PiBathtubThin, PiUsersThreeLight } from 'react-icons/pi';
import { LiaBedSolid } from 'react-icons/lia';
import HeartButtonFull from '../Button/HeartButtonFull';

const Card = ({ room }) => {
  const { user } = useContext(AuthContext);
  const [myWishList, setMyWishList] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
          setMyWishList(JSON.parse(storedWishlist));
        } else {
          const wishlistData = await getWishList();
          setMyWishList(wishlistData);
          localStorage.setItem('wishlist', JSON.stringify(wishlistData));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    // Fetch the wishlist when the user changes
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const isRoomInWishlist = myWishList.some((item) => item.roomId === room._id);

  const handleWishList = async (room) => {
    const roomDetails = {
      location: room?.location,
      title: room?.title,
      type: room?.type,
      image: room?.image,
      price: room?.price,
      email: user?.email,
      roomId: room?._id,
      isAdd: true,
    };

    try {
      const data = await roomWishList(roomDetails);
      console.log(data);

      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Room is successfully added to wishlist.',
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedWishlist = [...myWishList, roomDetails];
        setMyWishList(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error('Error adding room to wishlist:', error);
    }
  };

  return (
    <div className='rounded overflow-hidden shadow-xl transform hover:scale-110 duration-100'>
      <Link to={`/room/${room._id}`}>
        <img src={room.image} alt="" className='w-full h-52 object-cover' />
      </Link>

      <div className='absolute top-3 right-3'>
        {isRoomInWishlist ? (
          <HeartButtonFull />
        ) : (
          <HeartButton room={room} handleWishList={handleWishList} />
        )}
      </div>

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

export default Card;
