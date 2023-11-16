/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from "react-icons/fa";
import Container from '../Container/Container';

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setReviews(data)
            })
    }, [])
    return (
        <Container>
            <SectionTitle
                subHeading={'What our client say'}
                heading={'testimonials'}
            ></SectionTitle>
            <Swiper  modules={[Navigation]}
            navigation
            >

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                        review={review}
                    >


                        <div className='flex flex-col items-center mx-24 my-16'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <FaQuoteLeft className='mt-4 text-3xl'></FaQuoteLeft>
                            <p className='py-8'>{review.comment}</p>
                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>

                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </Container>
    );
};

export default Testimonials;