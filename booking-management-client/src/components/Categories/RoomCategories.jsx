/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Container/Container'
import RoomCategoryCard from './RoomCategoryCard';
import { roomCategories } from './roomCategoriesData';

const RoomCategories = () => {
    
    const [params, setParams] = useSearchParams();
    const category = params.get('category')
    return (
        <Container>
           <div>
            <p className='text-3xl text-gray-800 font-medium my-8'>Property Types</p>
           <div className='pt-4 flex flex-row items-center flex-nowrap justify-between overflow-x-auto gap-1 '>
        {roomCategories.map(item => (
          <RoomCategoryCard
            label={item.label}
            image={item.image}
            key={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
           </div>
        </Container>
    );
};

export default RoomCategories;