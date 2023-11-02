import { Link } from 'react-router-dom'
import HeartButton from '../Button/HeartButton'
import { FiMapPin } from 'react-icons/fi'
import '@smastrom/react-rating/style.css';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Card = ({ room }) => {

  const { user } = useContext(AuthContext);
  return (
    <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
      <img src={room.image} alt=""
        className='w-full h-52 object-cover	' />
      <div
        className='
        absolute
        top-3
        right-3
      '
      >
        <HeartButton />
      </div>
      <div className='flex flex-col items-start my-2 py-2 space-y-2'>
        {/* <Rating className='mx-2'
                                style={{ maxWidth: 80 }}
                                value={room.rating}
                                readOnly
                            /> */}
        <span className='font-semibold text-lg text-slate-500  mx-2'>{room.title}</span>
        <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10} /> {room.location}</span>
        <div className='font-light text-neutral-500'>
          {room.dateRange}
        </div>
        <div className='flex flex-row space-x-32'><div><p className='font-body text-[#20b759] mx-2'>${room.price}<span className='text-xs px-2'>/nignt</span> </p></div>
          <div className='grow-1'>
            <Link to={`/room/${room._id}`}>
              {!user ? (
                <button onClick={()=>{
      
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Log in first',
                    showConfirmButton: false,
                    timer: 1500
                  })
                 
                 }} className='bg-slate-500 p-1 rounded text-white text-sm'>
                  View details
                </button>
              ) : (
                <button className='bg-slate-500 p-1 rounded text-white text-sm'>
                  View details
                </button>
              )}
            </Link>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

