/* eslint-disable no-unused-vars */
import React from 'react';
import Container from '../Container/Container';
import { Fade } from 'react-reveal'; 

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <Container>
            <Fade bottom> 
                <div className='mx-auto text-center md:w-4/12 my-8'>
                    <h3  className='text-3xl uppercase border-y-4 py-4'>{heading}</h3>
                    <p  className='text-center mt-2 italic text-[#EA6045]'>--- {subHeading} ---</p>
                </div>
            </Fade>
        </Container>
    );
};

export default SectionTitle;