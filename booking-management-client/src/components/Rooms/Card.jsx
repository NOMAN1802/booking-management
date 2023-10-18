import { Link } from 'react-router-dom'
import HeartButton from '../Button/HeartButton'
import { FiMapPin } from 'react-icons/fi'

const Card = ({ room }) => {
  return (
    <div className='rounded overflow-hidden  shadow-xl transform hover:scale-110 duration-100'>
    <img src={room.image} alt=""
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
        <span className='font-semibold text-lg text-slate-500  mx-2'>{room.title}</span>
        <span className='font-body text-slate-500 text-xs flex flex-row items-center justify-center gap-1  mx-2'><FiMapPin size={10}/> {room.location}</span>
        <div className='flex flex-row space-x-32'><div><p className='font-body text-[#20b759] mx-2'>${room.price}<span className='text-xs px-2'>/nignt</span> </p></div> 
           <div className='grow-1'>
            <Link to={`/room/${1}`} > <button className='bg-slate-500 p-1 rounded text-white text-sm '> View details</button></Link>
          
           </div>
         </div>
    </div>
</div>
  )
}

export default Card

