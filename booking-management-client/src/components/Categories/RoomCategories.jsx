/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCategoryCard from './RoomCategoryCard';
import { roomCategories } from './roomCategoriesData';
import SectionTitle from '../SectionTitle/SectionTitle';

const RoomCategories = () => {
    
    const [params, setParams] = useSearchParams();
    const category = params.get('category')
    return (
        
           <div>
            <SectionTitle 
           subHeading={"Choose what suits you best"}
           heading={"Rooms Category"}
           >
           </SectionTitle>
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
        
    );
};

export default RoomCategories;