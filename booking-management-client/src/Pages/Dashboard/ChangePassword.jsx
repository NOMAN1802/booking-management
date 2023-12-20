/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { FaUser } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

const ChangePassword = () => {

    const [loading, setLoading] = useState(false);
    const {resetPassword} = useContext(AuthContext);
    const emailRef = useRef();

      // handle password reset

  const handleReset = () => {
    const email = emailRef.current.value;

    resetPassword(email)
      .then(() => {
        setLoading(false);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Please check your email to reset password',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        setLoading(false);

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500,
        });

        console.error(err.message);
      });
  };
    return (
        <Container>

       <SectionTitle
           subHeading={"Remind it"}
           heading={"Change Password"}
           >
           </SectionTitle>
            <h1 className='p-4 text-3xl font-thin'>Enter Your Email</h1>

            <form className='space-y-3 w-full' >

            <div className="flex flex-col items-start relative">
            <label className='text-sm' htmlFor="email">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                ref={emailRef}
                type='email'
                id='email'
                name='email'
                className="w-96 rounded-md pl-8"
                
                required

              />
            </div>
          </div>
            </form>
            <div className='mt-8 w-1/4'>
            <Button className='md:w-1/4 ' 
            
            onClick={handleReset} 
            label="Change Password" />
               
            </div>
            
            


        </Container>
    );
};

export default ChangePassword;