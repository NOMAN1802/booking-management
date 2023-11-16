/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from '../../components/Slider/Slider';
import RoomCategories from '../../components/Categories/roomCategories';
import CarCategories from '../../components/Categories/CarCategories';
import FeaturedRooms from '../../components/Rooms/FeaturedRooms';
import FeaturedCars from '../../components/Cars/FeaturedCars';
import Welcome from '../../components/Welcome/Welcome';
import Prices from '../../components/Price/Price';
import Testimonials from '../../components/Testimonials/Testimonials';
import FeaturedBlogs from '../../components/Blogs/FeaturedBlogs';

const Home = () => {
    return (
        <div className='relative'>
           <Slider></Slider>
           <Welcome/>
           <RoomCategories/>
           <div className='bg-gray-50 my-6'>
            <FeaturedRooms/>
           </div>
           <CarCategories/>
           <div className='bg-gray-50 my-6'>
            <FeaturedCars/>
           </div>
           <Prices/>
           <div  className='bg-gray-50 my-6'>
            <Testimonials/>
           </div>
           <div  className='bg-gray-50 my-6'>
            <FeaturedBlogs/>
           </div>
        </div>
       
    );
};

export default Home;