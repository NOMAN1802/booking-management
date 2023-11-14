/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import Card from './Card'
import Loader from '../Shared/Loader'
import Heading from '../Heading/Heading'
import SectionTitle from '../SectionTitle/SectionTitle'
import { getAllBlogs } from '../../api/blogs'

const Blogs = () => {
    
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getAllBlogs()
      .then(data => {
        
        setBlogs(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  if (loading) {
    return <Loader />
  }
    return (
        <Container>
          

          <SectionTitle 
           subHeading={"Learn More"}
           heading={" Blogs"}
           >
           </SectionTitle>
      {blogs && blogs.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {blogs.map((blog, index) => (
            <Card key={index} blog={blog} />
          ))}
        </div>
      ) : (
        <div className='pt-12'>
          <Heading
            title='No Blogs Available !'
            subtitle='Please Browse ibooking.'
            center={true}
          />
        </div>
      )}
    </Container>
    );
};

export default Blogs;