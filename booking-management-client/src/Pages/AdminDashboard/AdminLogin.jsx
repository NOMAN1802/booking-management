/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { app } from '../../firebase/firebase.config';
import { getAuth } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLogin = () => {


  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.pathname || "/dashboard/adminDashboard";
  const emailRef = useRef();


  //   with google signIn
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);

        const saveInfo = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL }
        fetch('http://localhost:5000/infoAdmin', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(saveInfo)
        })
          .then(res => res.json())
          .then(() => {
            navigate('/dashboard/adminDashboard');

          })


      })
  }


  const handleSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        console.log(result.user)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Admin Login Successfully ',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/dashboard/adminDashboard');

      }).catch((err)=>{
        setLoading(false)
        Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500,
         });
      })
  }


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


  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Admin Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to ibooking
          </p>
        </div>
        <form className="space-y-3 w-full"
        //  onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
         >
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

          <div className="flex flex-col items-start relative">
            <div className='flex items-center space-x-52'>
              <label className='text-sm' htmlFor="password">Password</label>

            </div>
            <div className="relative">
              <input
                type={viewPassword ? 'text' : 'password'}
                id="password"
                name='password'
                className="w-96 rounded-md pl-10 pr-10"
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
              Log In
            </button>
          </div>

        </form>
        <div className='space-y-1'>
          <button onClick={handleReset} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>

        <p className='text-xl text-gray-600 text-center'>OR</p>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link
            to='/adminSignUp'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;