/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../assets/Slider/slider-1.jpeg'
import img2 from '../../assets/Slider/slider-2.jpeg'
import img3 from '../../assets/Slider/slider-3.jpeg'
import img4 from '../../assets/Slider/slider-4.jpeg'
import Search from './Search';
import { useEffect } from 'react';
import { getAllRooms } from '../../api/rooms';
import SearchForm from './SearchForm';
import SearchCarForm from './SearchCarForm';

const Slider = () => {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isCarOpen, setIsCarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllRooms()
      .then(data => {
        setRooms(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className="relative">
      <div>
        <Carousel className='relative z-10' showThumbs={false} infiniteLoop emulateTouch swipeable showArrows>
          <div className="slide">
            <img className="h-2/3" src={img1} alt="Slide 1" />
          </div>
          <div className="slide">
            <img className="h-2/3" src={img2} alt="Slide 2" />
          </div>
          <div className="slide">
            <img className="h-2/3" src={img3} alt="Slide 3" />
          </div>
          <div className="slide">
            <img className="h-2/3" src={img4} alt="Slide 4" />
          </div>
        </Carousel>
      </div>
      <div className='md:absolute md:top-48 md:left-64 md:w-1/2 md:z-10 sm:absolute'>
        <div>

          <div>
            

            {isRoomOpen ? (
              <SearchForm setIsRoomOpen={setIsRoomOpen}></SearchForm>
            ) : (
              isCarOpen ? (
                <SearchCarForm setIsCarOpen={setIsCarOpen}></SearchCarForm>
              ) : (
                <Search isCarOpen={isCarOpen} setIsCarOpen={setIsCarOpen} isRoomOpen={isRoomOpen} setIsRoomOpen={setIsRoomOpen}></Search>
              )
            )}


          </div>

        </div>

      </div>
    </div>
  );
};

export default Slider;
