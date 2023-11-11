/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import Card from './Card'
import Loader from '../Shared/Loader'
import {  getFeaturedCars } from '../../api/cars'
import SectionTitle from '../SectionTitle/SectionTitle'

const FeaturedCars = () => {
    
    const [featuredCars, setFeaturedCars] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      getFeaturedCars()
        .then(data => {
          setFeaturedCars(data)
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
           subHeading={"Featured Cars"}
           heading={"Cars!"}
           >
           </SectionTitle>

       <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {featuredCars.map((car, index) => (
            <Card key={index} car={car} />
          ))}
        </div>
    </Container>
    );
};

export default FeaturedCars;