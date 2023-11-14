/* eslint-disable no-unused-vars */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Header from '../../components/Blogs/Header';
import BlogInfo from '../../components/Blogs/BlogInfo';

const BlogDetails = () => {
    const blogData = useLoaderData();
    return (
        <Container>
        <div className='max-w-screen-lg mx-auto '>
          <div className='flex flex-col gap-6'>
            <Header blogData={blogData} />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
              <BlogInfo blogData={blogData}/>
            </div>
          </div>
        </div>
      </Container>
    );
};

export default BlogDetails;