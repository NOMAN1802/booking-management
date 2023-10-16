/* eslint-disable no-unused-vars */
// LoginModal.js
import React, { useContext, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Modal from './Modal';
import { useForm } from 'react-hook-form';
import { BiLogoFacebook } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import SignUpModal from './SignUpModal';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { app } from '../../firebase/firebase.config';
import { getAuth } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const { signIn,googleSignIn } = useContext(AuthContext);
  const auth = getAuth(app);
  const navigate = useNavigate();
    const location = useLocation();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

const onSubmit = (data) => {
  setLoading(true);
  const { email, password } = data || {};

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Display an error message or prevent form submission
    console.log('Invalid email format');
    return;
  }

  signIn(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Login Successfully ',
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.error('Sign-in error:', error);
      // Handle sign-in error, display error message, etc.
    });
};


  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    
  };
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
    
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Sign In">
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
            <div className="flex flex-col items-start relative">
              <label className='text-sm' htmlFor="email">Email</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="w-96 rounded-md pl-8"
                  {...register('email')}
                />
              </div>
            </div>

            <div className="flex flex-col items-start relative">
              <div className='flex items-center space-x-52'>
                <label className='text-sm' htmlFor="password">Password</label>
                <span className="text-gray-500 text-sm cursor-pointer hover:underline">
                  Forgot Password?
                </span>
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

            <div className=''>
              <button type="submit" className='bg-gray-500 w-96 rounded-md py-3 text-white my-4'>
                Log In
              </button>
            </div>

            <p className='text-xl text-gray-600 text-center'>OR</p>

            <div className='grid grid-cols-2 gap-2'>
              <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                onClick={handleGoogleSignIn}
              >
                <BiLogoFacebook size={24} />
                Facebook
              </div>
              <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={24} />
                Google
              </div>
            </div>

            <div>
            
            <div>
          <p>
            Not registered?{' '}
            <span
              className="text-gray-400 hover:underline cursor-pointer"
              onClick={openSignUpModal}
            >
              Create an account
            </span>
          </p>
        </div>
        {isSignUpModalOpen && (
        <SignUpModal isOpen={isSignUpModalOpen} setIsOpen={closeSignUpModal} />
      )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
