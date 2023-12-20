/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import FeedBack from '../FeedBack/FeedBack';
import { FaRegTrashAlt, FaRegUser, FaTrash, FaUser } from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating';
import { AiOutlineMessage } from 'react-icons/ai';
import useGuest from '../../hooks/useGuest';
import { AuthContext } from '../../providers/AuthProvider';


const BlogInfo = ({blogData,refetchBlogData}) => {

  const postId = blogData?._id;
  const [isGuest] = useGuest();
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState(blogData?.reviews || []);

  const handleDeleteReview = async (index) => {
    try {
      // Assuming you have an API endpoint to delete a review
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${postId}/reviews/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted review from the local state
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
        refetchBlogData();
      } else {
        console.error('Error deleting review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
    return (
      
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
            
            <div className='border border-rose-500 p-4 w-56 gap-2 flex items-center justify-center rounded hover:scale-110'> Author:{blogData?.author}</div>
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
        <hr className='mt-4'/>

        <div className='my-4'>
        <p className='font-semibold text-2xl my-2'>Review</p> 
          <FeedBack postId={postId} refetchBlogData={refetchBlogData}/>
        </div>

        <div className='mt-4'>
        {blogData.reviews && blogData.reviews.length > 0 ? (
          blogData.reviews.map((review, index) => (
            <div key={index} className='mb-4 card w-2/3 bg-gray-50 p-4 space-y-2'>
              
              <p className='flex gap-2  items-center'><FaRegUser/> <span>{review.name}</span></p>
              

              <Rating 
                                style={{ maxWidth: 80 }}
                                value={review.rating}
                                readOnly
                            />
              <p className='flex gap-2 items-center'><AiOutlineMessage /> <span>{review.comment}</span></p>
              <button className='relative cursor-pointer'
              disabled={isGuest || !user}
              onClick={() => handleDeleteReview(index)}
              >
              <FaRegTrashAlt className='absolute right-3 bottom-1'/>
              </button>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
        </div>
      </div>
       
        
    );
};

export default BlogInfo;