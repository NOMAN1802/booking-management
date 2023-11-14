/* eslint-disable no-unused-vars */
import React from 'react';


const BlogInfo = ({blogData}) => {
    return (
        <>
            <div className='col-span-12 flex flex-col gap-8'>
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
            <div>Hosted by {blogData?.host?.name}</div>
  
            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              src={blogData?.host?.image}
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
            
            <div className='border border-rose-500 p-4 w-48 gap-2 flex items-center justify-center rounded hover:scale-110'> Doors:{blogData?.title}</div>
            <div className='border border-rose-500 p-4 w-48 gap-2 flex items-center justify-center rounded hover:scale-110'> Type:{blogData?.type}</div>
            <div className='border border-rose-500 p-4 w-48 gap-2 flex items-center justify-center rounded hover:scale-110'> Date:{blogData.date ? new Date(blogData?.date).toLocaleString('default', { month: 'short', day: 'numeric' }) : ''}</div>
          </div>
        </div>
  
        <hr />
        <p className='text-center font-semibold text-2xl'>{blogData.title}</p>
        <div
          className='
          text-lg text-neutral-600 my-y'
        >
          {blogData?.blog}
        </div>
      </div>
      <hr className='mt-4'/>
        </>
    );
};

export default BlogInfo;