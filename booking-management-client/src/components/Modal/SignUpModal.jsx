/* eslint-disable no-unused-vars */
// SignUpModal.js
import React, { useContext, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Modal from './Modal';
import { useForm } from 'react-hook-form';
import { BiLogoFacebook } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpModal = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const {createUser, googleSignIn,updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  


const onSubmit = async (data) => {
  try {
    setLoading(true);
    
    const displayName = `${data.firstName} ${data.lastName}`;

    // Create the user with email and password
    const result = await createUser(data.email, data.password);
    const loggedUser = result.user;

    // Update the user's display name and photoURL
    await updateUserProfile(displayName, data.photoURL);

    // Prepare user data to be sent to the server
    const saveInfo = {
      name: displayName,
      photoURL: data.photoURL,
      email: data.email,
      role: data.role,
    };

    // Send user data to the server
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveInfo),
    });

    if (response.ok) {
      reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Created Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } else {
      // Handle any errors from the server
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something  wrong in server!',
      });
    }
  } catch (error) {
    // Handle any Firebase or other errors
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something wrong in firebase Authentication!',
    });
  } finally {
    setLoading(false);
  }
};



 //   with google signIn
 const handleGoogleSignIn = () => {
  googleSignIn()
  .then(result =>{
      const loggedInUser = result.user;
      console.log(loggedInUser);
       
      const saveInfo = {name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL }
      fetch('http://localhost:5000/users',{
          method: 'POST',
          headers: {
           'content-type': 'application/json'
          },
          body: JSON.stringify(saveInfo)
       })
       .then(res => res.json())
       .then(() =>{
          
            navigate('/');
         
       })

      
  })
}
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Sign Up">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 z-50 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-opacity-50"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full my-4">
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>

            {/* name */}
            <div className='grid grid-cols-2 gap-2'>
            <div className="flex flex-col items-start relative">
              <label className='text-sm' htmlFor="firstName">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  className="w-44 rounded-md pl-8"
                  {...register('firstName')}
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative">
              <label className='text-sm' htmlFor="lastName">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  className="w-44 rounded-md pl-8"
                  {...register('lastName')}
                />
              </div>
            </div>
            </div>

            {/* email */}
            <div className="flex flex-col items-start relative">
              <label className='text-sm' htmlFor="email">Email</label>
              <div className="relative">
                <MdOutlineAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="w-96 rounded-md pl-8"
                  {...register('email')}
                />
              </div>
            </div>

            {/* password */}

            <div className="flex flex-col items-start relative">
              <div className='flex items-center space-x-52'>
                <label className='text-sm' htmlFor="password">Password</label>
               
              </div>
              <div className="relative">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  id="password"
                  className="w-96 rounded-md pl-10 pr-10"
                  {...register('password')}
                />
                <div
                  onClick={handleViewPassword}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                >
                  {viewPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <button type="submit" className='bg-gray-500 w-96 rounded-md py-3 text-white my-4'>
                Sign Up
              </button>
            </div>

            <p className='text-xl text-gray-600 text-center'>OR</p>

            <div>
             
              <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={24} />
                Google
              </div>
            </div>

            <div>
              <p>
                Already have an account?{' '}
                <span
                 onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:underline cursor-pointer"
                >
                  Log In
                </span>
              </p>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
