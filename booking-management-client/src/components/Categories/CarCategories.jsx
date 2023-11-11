/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Container/Container'
import { carCategories } from './carCategoriesData';
import CarCategoryCard from './CarCategoryCard';
import SectionTitle from '../SectionTitle/SectionTitle';

const CarCategories = () => {
    const [params, setParams] = useSearchParams();
    const carCategory = params.get('type')
    return (
        <Container>
           <div>
           <SectionTitle
           subHeading={"Choose what suits you best"}
           heading={"Car Category"}
           >
           </SectionTitle>
           <div className='pt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
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