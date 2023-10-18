/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from '../../components/Slider/Slider';
import RoomCategories from '../../components/Categories/roomCategories';
import Rooms from '../../components/Rooms/Rooms';

const Home = () => {
    return (
        <div className='relative'>
           <Slider></Slider>
           <RoomCategories/>
           <div className='bg-gray-50 my-6'>
            <Rooms/>
           </div>
        </div>
    );
};

export default Home;