import { BiSearch } from 'react-icons/bi'
import { MdOutlineLocationCity } from 'react-icons/md'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { PiUsersThreeLight } from 'react-icons/pi'

const Search = () => {
  return (
    <div>
        <p className='text-5xl px-4 text-white text-center font-semibold my-12'>Enjoy a great ride with ibooking</p>
        <div className='flex flex-row my-2 gap-2 cursor-pointer'>
            
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded'>Hotel</p>
                <p className='bg-slate-500 text-white p-2 text-sm font-light rounded'>Apartment</p>
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded'>Car</p>
                <p className='bg-slate-500 text-white py-2 px-4 text-sm font-light rounded'>Space</p>
                <p className='bg-slate-500 text-white py-2 px-4 text-sm font-light rounded'>Beauty</p>
                <p className='bg-slate-500 text-white py-2 px-6 text-sm font-light rounded'>Tour</p>
            

        </div>
       <div className='flex flex-row'>
       <div className='border-[2px] w-full md:w-auto py-6 rounded shadow-sm hover:shadow-md bg-white cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-lg font-semibold px-8 flex  items-center justify-center gap-2'> <MdOutlineLocationCity size={24}/> Location</div>
        <div className='text-lg font-semibold  border-x-[2px] px-8 flex items-center justify-center gap-2'> <FaRegCalendarAlt size={24}/> Check In</div>
        <div className='text-lg font-semibold px-8 flex items-center justify-center gap-2  border-x-[2px] '><FaRegCalendarAlt size={24}/> Check Out</div>
        <div className='text-lg font-semibold px-8 flex items-center justify-center gap-2'>
            <PiUsersThreeLight size={24}/>
          Adult
        </div>
        
        </div>
      </div>
      <div className='text-lg pl-6 pr-2 bg-slate-500 rounded text-gray-100  flex flex-row items-center gap-2 '>
      <BiSearch size={24} />
          Search
      </div>
       </div>
    </div>
    
  )
}

export default Search
