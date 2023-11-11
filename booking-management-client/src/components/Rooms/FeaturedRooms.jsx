/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import Card from './Card'
import Loader from '../Shared/Loader'
import {  getFeaturedRooms } from '../../api/rooms'
import SectionTitle from '../SectionTitle/SectionTitle'

const FeaturedRooms = () => {
    
    const [featuredRooms, setFeaturedRooms] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      getFeaturedRooms()
        .then(data => {
          setFeaturedRooms(data)
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
           subHeading={"Featured Rooms"}
           heading={"Rooms!"}
           >
           </SectionTitle>

       <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {featuredRooms && featuredRooms?.map((room, index) => (
            <Card key={index} room={room} />
          ))}
        </div>
    </Container>
    );
};

export default FeaturedRooms;