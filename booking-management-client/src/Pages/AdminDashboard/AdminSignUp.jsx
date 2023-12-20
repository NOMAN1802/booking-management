/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSignUp = () => {

    const [loading, setLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const { createUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.pathname || "/dashboard/adminDashboard";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // Combine 'firstName' and 'lastName' into 'displayName'
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
            const response = await fetch('http://localhost:5000/infoAdmin', {
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
                navigate('/dashboard/adminDashboard');
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
    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

   
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Admin Sign Up</h1>
                    <p className='text-sm text-gray-400'>Welcome to ibooking</p>
                </div>
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
                                    className="w-full rounded-md pl-8"
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
                                    className=" w-full rounded-md pl-8"
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
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/adminLogin'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default AdminSignUp;
