import { BiSearch, BiSpa } from 'react-icons/bi'
import { MdOutlineLocationCity } from 'react-icons/md'
import {  FaHotel, FaRegBuilding, FaRegCalendarAlt } from 'react-icons/fa'
import {  FaMapLocation} from 'react-icons/fa6'
import { PiUsersThreeLight } from 'react-icons/pi'
import { MdOutlineApartment } from 'react-icons/md'
import { AiOutlineCar } from 'react-icons/ai'




const Search = () => {
    
  return (
    <div  >
        <p className='text-5xl px- md:text-white text-center font-semibold my-12 sm:text-gray-500'>Enjoy a great ride with ibooking</p>
        <div className='md:flex md:flex-row md:my-2 md:gap-2 md:cursor-pointer sm:hidden'>
            
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1'> <FaHotel size={18}/> Hotel</p>
                <p className='bg-slate-500 text-white p-2 text-sm font-light rounded flex flex-row gap-1'><MdOutlineApartment size={18}/> Apartment</p>
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1'> <AiOutlineCar size={18}/> Car</p>
                <p className='bg-slate-500 text-white py-2 px-4 text-sm font-light rounded flex flex-row gap-1'> <FaRegBuilding size={18} /> Space</p>
                <p className='bg-slate-500 text-white py-2 px-4 text-sm font-light rounded flex flex-row gap-1'> <BiSpa size={18}/> Beauty</p>
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1'> <FaMapLocation size={18} /> Tour</p>
            

        </div>
        
       <div className='md:flex md:flex-row sm:flex-col'>
       <div className='border-[2px] w-full md:w-auto py-4  shadow-sm hover:shadow-md bg-white cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-lg font-normal px-6 flex  items-center justify-center gap-2 '> <MdOutlineLocationCity size={24}/> Location</div>
        <div className='text-lg font-normal  border-x-[2px] px-6 flex items-center justify-center gap-2'> <FaRegCalendarAlt size={24}/> Check In</div>
        <div className='text-lg font-normal px-6 flex items-center justify-center gap-2  border-x-[2px] '><FaRegCalendarAlt size={24}/> Check Out</div>
        <div className='text-lg font-normal px-6 flex items-center justify-center gap-2'>
            <PiUsersThreeLight size={24}/>
          Adult
        </div>
        
        </div>
      </div>
      <div className='text-lg pl-6 pr-2 bg-slate-500 rounded text-gray-100 flex flex-row  items-center gap-2 '>
      <BiSearch size={24} />
          Search
      </div>
       </div>
    </div>
    
  )
}

export default Search
