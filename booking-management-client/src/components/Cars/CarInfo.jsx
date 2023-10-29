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
            <div>Total Seat: {carData?.total_seat}</div>
            <div>Capacity of baggage: {carData?.baggage}</div>
            <div>Total doors:{carData?.doors}</div>
          </div>
        </div>
  
        <hr />
        <div
          className='
          text-lg font-light text-neutral-500'
        >
          {carData?.description}
        </div>
        <hr />
      </div>
    )
  }
  
  export default RoomInfo