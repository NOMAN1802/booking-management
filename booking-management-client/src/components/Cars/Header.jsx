/* eslint-disable no-unused-vars */
import React from 'react'
import Heading from '../Heading/Heading'

const Header = ({carData}) => {
  return (
    <>
      <Heading
         
        title={carData?.location}
        subtitle={carData?.destination}
        
      />
      <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
        <img
          className='object-cover w-full'
          src= {carData.image}
          alt='header image'
        />
      </div>
    </>
  )
}

export default Header