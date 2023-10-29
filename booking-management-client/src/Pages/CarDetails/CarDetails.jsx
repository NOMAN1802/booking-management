/* eslint-disable no-unused-vars */
import React from 'react'
import Container from '../../components/Container/Container'
import Header from '../../components/Cars/Header'
import CarInfo from '../../components/Cars/CarInfo'
import CarBooking from '../../components/Cars/CarBooking'
import { useLoaderData } from 'react-router-dom'
const CarDetails = () => {
  const carData = useLoaderData();
  
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto '>
        <div className='flex flex-col gap-6'>
          <Header carData={carData} />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <CarInfo carData={carData}/>
            <div className='mb-10 md:col-span-3 order-first md:order-last'>
              <CarBooking carData={carData}/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CarDetails