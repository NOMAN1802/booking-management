/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Header from '../../components/Blogs/Header';
import BlogInfo from '../../components/Blogs/BlogInfo';

const BlogDetails = () => {
    // Initial blogData state with the data from useLoaderData()
  const initialBlogData = useLoaderData();
  const [blogData, setBlogData] = useState(initialBlogData);

  // Refetch function to get updated blog data
  const refetchBlogData = async () => {
    try {
      // Assuming you have an API endpoint to fetch the blog data
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${blogData?._id}`);
      if (response.ok) {
        const updatedBlogData = await response.json();
        setBlogData(updatedBlogData);
      } else {
        console.error('Error fetching updated blog data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect to call refetchBlogData when the component mounts
  useEffect(() => {
    refetchBlogData();
  }, []); 

    return (
        <Container>
        <div className='max-w-screen-lg mx-auto '>
          <div className='flex flex-col gap-6'>
            <Header blogData={blogData} />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
              <BlogInfo blogData={blogData} refetchBlogData={refetchBlogData} />
            </div>
          </div>
        </div>
      </Container>
    );
};

export default BlogDetails;