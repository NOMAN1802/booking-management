/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { addBlog } from '../../api/blogs';
import Swal from 'sweetalert2';
import { imageUpload } from '../../api/utils';
import { TbFidgetSpinner } from 'react-icons/tb';

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const location = event.target.location.value;
        const title = event.target.title.value;
        const email = event.target.email.value;
        const author = event.target.author.value;
        const blog = event.target.blog.value;
        // const date = event.target.date.value;
        const type = event.target.type.value;
        const image = event.target.image.files[0];

        // Image Upload
        imageUpload(image).then((data) =>{
            const blogData = {
                title,
                location,
                image: data.data.display_url,
                host:{
                    name : user?.displayName,
                    image: user?.photoURL,
                    email : user?.email,
   
                   },
                author,
                blog,
                type
            };

            addBlog(blogData)
            .then((data) => {
                console.log(data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Blog added successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/hostDashboard');
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong on the server!',
                });
                setLoading(false);
              })
        }) .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });   
             
    };

    const handleImageChange = (image) => {
        setUploadButtonText(image.name);
      };
    
    return (
        <div>
            <SectionTitle
                subHeading={"Let us know what is in your mind"}
                heading={"Add Blog"}
            >
            </SectionTitle>
            <>
                <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>

                    <form className=" w-2/3 p-8 space-y-12" onSubmit={handleSubmit}>

                        {/* title */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='title' className='block text-gray-600'>
                                    Title
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='title'
                                    id='title'
                                    type='text'
                                    placeholder='Title'
                                    required
                                />
                            </div>
                            {/* location */}

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='location' className='block text-gray-600'>
                                    Location
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='location'
                                    id='location'
                                    type='text'
                                    placeholder='Location'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            {/* email  */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             
                                <div className='space-y-6 text-sm'>
                                    <label htmlFor='email' className='block text-gray-600'>
                                        Email
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                        name='email'
                                        id='email'
                                        type='text'
                                        placeholder='email'
                                        required
                                        value={user?.email}
                                        readOnly

                                    />
                                </div>
                                {/* author */}


                                <div className='space-y-6 text-sm'>
                                    <label htmlFor='author' className='block text-gray-600'>
                                        Author
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                        name='author'
                                        id='author'
                                        type='text'
                                        placeholder='Author'
                                        required
                                        value={user?.displayName}
                                        readOnly
                                    />
                                </div>
                            </div>


                        </div>
                        {/* image */}

                        <div className='grid sm:grid-cols-1 md:grid-cols-2'>


                        <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            onChange={event => {
                                                handleImageChange(event.target.files[0]);
                                            }}
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover-bg-rose-500'>
                                            {uploadButtonText}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>


                        {/* type */}

                        <div className='space-y-1 text-sm'>
              <label htmlFor='type' className='block text-gray-600'>
                Type
              </label>
              <select
                required
                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                name='type'
              >
               
                  <option >
                    Regular
                  </option>
                  <option >
                    Featured
                  </option>
               
              </select>
            </div>

                        </div>
                        {/* blog */}
                        <div className="flex flex-col">
                            <label htmlFor="blog" className="text-normal text-gray-400">
                                Blog
                            </label>
                            <textarea
                                className="w-full   h-56 px-4 py-3  rounded-md"
                                type="text"
                                id="blog"
                                name='blog'
                                required
                            />
                        </div>
                        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Save & Continue'
          )}
        </button>
                    </form>
                </div>
            </>
        </div>
    );
};

export default AddBlog;