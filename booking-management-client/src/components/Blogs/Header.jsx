/* eslint-disable no-unused-vars */
import React from 'react'
import Heading from '../Heading/Heading'

const Header = ({blogData,refetch}) => {
  return (
    <>
      <Heading
         
        title={blogData?.title}
        subtitle={blogData?.location}
        
      />
      <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
        <img
          className='object-cover w-full'
          src= {blogData.image}
          alt='header image'
        />
      </div>
    </>
  )
}

export default Header