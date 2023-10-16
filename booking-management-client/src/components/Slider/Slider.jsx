import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../assets/Slider/slider-1.jpeg'
import img2 from '../../assets/Slider/slider-2.jpeg'
import img3 from '../../assets/Slider/slider-3.jpeg'
import img4 from '../../assets/Slider/slider-4.jpeg'
import Search from './Search';
// import './Slider.css';

const Slider = () => {
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
           <div className='absolute top-48 left-64 w-1/2 z-10 '>
           <Search></Search>

           </div>
        </div>
    );
};

export default Slider;
