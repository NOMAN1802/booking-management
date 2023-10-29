import { Link } from 'react-router-dom'
import HeartButton from '../Button/HeartButton'
import { FiMapPin } from 'react-icons/fi'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Card = ({ car }) => {
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
        <HeartButton />
      </div>
    <div className='flex flex-col items-start my-2 py-2 space-y-2'>
    <Rating className='mx-2'
                                style={{ maxWidth: 80 }}
                                value={car.rating}
                                readOnly
                            />
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

