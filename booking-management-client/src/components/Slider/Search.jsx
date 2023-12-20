import { BiSearch } from 'react-icons/bi'
import { MdOutlineLocationCity } from 'react-icons/md'
import {  FaHotel, FaRegCalendarAlt } from 'react-icons/fa'
import { PiUsersThreeLight } from 'react-icons/pi'
import { AiOutlineCar } from 'react-icons/ai'
const Search = ({setIsRoomOpen,setIsCarOpen}) => {
    
  return (
    <div >
        {setIsRoomOpen &&<p className='text-5xl px- md:text-white text-center font-semibold my-12 sm:text-gray-500'>Enjoy a great ride with ibooking</p>}
        <div className='md:flex md:flex-row md:my-2 md:gap-2 md:cursor-pointer sm:hidden'>
            
                {setIsRoomOpen &&<p onClick={() => setIsRoomOpen(true)} className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1'> <FaHotel size={18}/> Rooms</p>}
              {setIsCarOpen &&
                <p onClick={() => setIsCarOpen(true)} className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1'> <AiOutlineCar size={18}/> Cars</p>
               }
            
        </div>
        
       <div  className='md:flex md:flex-row sm:flex-col '>
       <div className='border-l-2 w-full md:w-auto py-4  shadow-sm hover:shadow-md bg-white cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-lg font-normal px-6 flex  items-center justify-center gap-2 '> <MdOutlineLocationCity size={24}/> Location</div>
        <div className='text-lg font-normal  border-l-2 px-6 flex items-center justify-center gap-2'> <FaRegCalendarAlt size={24}/> Check In</div>
        <div className='text-lg font-normal px-6 flex items-center justify-center gap-2  border-l-2 '><FaRegCalendarAlt size={24}/> Check Out</div>
        <div className='text-lg font-normal px-6 flex items-center justify-center gap-2 border-l-2'>
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