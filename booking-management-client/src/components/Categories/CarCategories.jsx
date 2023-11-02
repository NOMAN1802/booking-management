/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Container/Container'
import { carCategories } from './carCategoriesData';
import CarCategoryCard from './CarCategoryCard';

const CarCategories = () => {
    const [params, setParams] = useSearchParams();
    const carCategory = params.get('type')
    return (
        <Container>
           <div>
            <p className='text-3xl text-gray-800 font-medium my-8'>Car Types</p>
           <div className='pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {carCategories.map(item => (
          <CarCategoryCard
            label={item.label}
            image={item.image}
            key={item.label}
            seat={item.seat}
            bags={item.bags}
            selected={carCategory === item.label}
          />
        ))}
      </div>
           </div>
        </Container>
    );
};

export default CarCategories;