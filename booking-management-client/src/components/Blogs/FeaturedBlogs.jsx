/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import Card from './Card'
import Loader from '../Shared/Loader'
import SectionTitle from '../SectionTitle/SectionTitle'
import { getFeaturedBlogs } from '../../api/blogs'

const FeaturedBlogs = () => {
    
    const [featuredBlogs, setFeaturedBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      getFeaturedBlogs()
        .then(data => {
        setFeaturedBlogs(data)
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
           subHeading={"Featured Blogs"}
           heading={"Blogs!"}
           >
           </SectionTitle>

       <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {featuredBlogs.map((blog, index) => (
            <Card key={index} blog={blog} />
          ))}
        </div>
    </Container>
    );
};

export default FeaturedBlogs;