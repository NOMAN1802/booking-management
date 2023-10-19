/* eslint-disable no-unused-vars */
import React from 'react'
import Heading from '../Heading/Heading'

const Header = ({roomData}) => {
  return (
    <>
      <Heading
        title={roomData?.title}
        subtitle={roomData?.location}
      />
      <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
        <img
          className='object-cover w-full'
          src='https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg'
          alt='header image'
        />
      </div>
    </>
  )
}

export default Header