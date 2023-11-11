import { Link } from 'react-router-dom'
import HeartButton from '../Button/HeartButton'
import { FiMapPin } from 'react-icons/fi'
// import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { carWishList } from '../../api/wishList';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useHost from '../../hooks/useHost';

const Card = ({ car }) => {
 
  const{user} = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHost] = useHost();
  const [myWishList, setMyWishList] = useState([]);

  const handleWishList = (car) => {
    
    const carDetails = {
      location: car?.location,
      title: car?.destination,
      image: car?.image,
      price: car?.price,
      email: user?.email
    };
  
    carWishList(carDetails)
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Car is successfully added to wishlist.',
            showConfirmButton: false,
            timer: 1500,
          });
  
          // Use the functional form of state update
          setMyWishList((prevWishList) => [...prevWishList, carDetails]);
        }
      })
      .catch((error) => {
        console.error('Error adding car to wishlist:', error);
      });
  };
  return (
    <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
    <img src={car.image} alt=""
        className='w-full h-52 object-cover	'/>
        <div
        className='
        absolute
        top-3
        right-3
      '
      >
        <HeartButton
        
         car={car} 
         handleWishList={handleWishList}/>
      </div>
      <div className='absolute'>
      <p className="relative -right-1 -skew-x-6 bottom-10 bg-[#EA6045] px-4 py-2 font-bold text-white">
                {car?.type}
        </p>
      </div>
    <div className='flex flex-col items-start my-2 py-2 space-y-2'>
    {/* <Rating className='mx-2'
                                style={{ maxWidth: 80 }}
                                value={car.rating}
                                readOnly
                            /> */}
        <span className='font-semibold text-lg text-slate-500  mx-2'>{car.title}</span>
        <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10}/> {car.location}</span>
        <div className='flex flex-row space-x-32'><div><p className='font-body text-[#20b759] mx-2'>${car.price}<span className='text-xs px-2'>/day</span> </p></div> 
           <div className='grow-1'>
            <Link to={`/car/${car._id}`} > <button className='bg-slate-500 p-1 rounded text-white text-sm '> View details</button></Link>
          
           </div>
         </div>
    </div>
</div>
  )
}

export default Card

