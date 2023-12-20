/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import Card from './Card'
import Loader from '../Shared/Loader'
import { useSearchParams } from 'react-router-dom'
import Heading from '../Heading/Heading'
import { getAllCars, getApprovedCars } from '../../api/cars'
import CarCategories from '../Categories/CarCategories'
import SectionTitle from '../SectionTitle/SectionTitle'

const Cars = () => {
    const [param, setParam] = useSearchParams()
  const carCategory = param.get('type')

  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getApprovedCars()
      .then(data => {
        if (carCategory) {
          const filtered = data.filter(car => car?.carType === carCategory)
          setCars(filtered)
        } else {
          setCars(data)
        }

        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [carCategory])

  if (loading) {
    return <Loader />
  }
    return (
        <Container>
          <CarCategories/>

          <SectionTitle 
           subHeading={"Choose what suits you best"}
           heading={"Available Cars"}
           >
           </SectionTitle>
      {cars && cars.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {cars.map((car, index) => (
            <Card key={index} car={car} />
          ))}
        </div>
      ) : (
        <div className='pt-12'>
          <Heading
            title='No Cars Available In This Category!'
            subtitle='Please Select Other Categories.'
            center={true}
          />
        </div>
      )}
    </Container>
    );
};

export default Cars;