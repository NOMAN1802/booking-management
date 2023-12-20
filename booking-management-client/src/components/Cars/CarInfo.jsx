import { FaWifi, FaCar } from 'react-icons/fa';
import { FaRadio } from 'react-icons/fa6'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'

const RoomInfo = ({carData}) => {
    return (
      <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Hosted by {carData?.host?.name}</div>
  
            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              src={carData?.host?.image}
            />
          </div>
          <div
            className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
          >
            <div className='border border-rose-500 p-6 w-36 gap-2 flex items-center justify-center rounded hover:scale-110'> Seat: {carData?.total_seat}</div>
            <div className='border border-rose-500 p-6 w-36 gap-2 flex items-center justify-center rounded hover:scale-110'> Baggage: {carData?.baggage}</div>
            <div className='border border-rose-500 p-6 w-36 gap-2 flex items-center justify-center rounded hover:scale-110'> Doors:{carData?.doors}</div>
            <div className='border border-rose-500 p-6 w-36 gap-2 flex items-center justify-center rounded hover:scale-110'> Type:{carData?.carType}</div>
          </div>
        </div>
  
        <hr className='mt-12'/>
        <div
          className='
          text-lg font-light text-neutral-500 mt-8'
        >
          {carData?.description}
        </div>
        <hr className='mt-12'/>
        <div className='flex flex-wrap gap-4'>
        {carData?.facilities?.map((facility, index) => (
          <div key={index} className='flex items-center gap-2 group'>
            {facility === 'wifi' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Wifi <FaWifi />
              </div>
            )}
            {facility === 'parking' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Parking <FaCar />
              </div>
            )}
            {facility === 'radio' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                FM <FaRadio />
              </div>
            )}
            {facility === 'airBag' && (
              <div className='border border-rose-500 p-6 w-32 gap-2 flex items-center justify-center rounded group-hover:scale-110'>
                Air Bags <MdAirlineSeatReclineExtra />
              </div>
            )}
          </div>
        ))}
       
      </div>
      <hr />
       
      </div>
    )
  }
  
  export default RoomInfo