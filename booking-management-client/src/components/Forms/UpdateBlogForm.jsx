/* eslint-disable no-unused-vars */
import React from 'react'
import { TbFidgetSpinner } from 'react-icons/tb';
const UpdateBlogForm = ({
  handleSubmit,
  loading,
  handleImageUpdate,
  blogData,
  setBlogData,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-1 text-sm'>
            <label htmlFor='location' className='block text-gray-600'>
              Location
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='location'
              value={blogData?.location}
              onChange={event =>
                setBlogData({ ...blogData, location: event.target.value })
              }
              id='location'
              type='text'
              placeholder='Location'
              required
            />
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='title' className='block text-gray-600'>
              Title
            </label>
            <input
              value={blogData?.title}
              onChange={event =>
                setBlogData({ ...blogData, title: event.target.value })
              }
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='title'
              id='title'
              type='text'
              placeholder='Title'
              required
            />
          </div>


       
          <div className='grid grid-cols-2 justify-between gap-2'>

            <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      onChange={event => {
                        handleImageUpdate(event.target.files[0])
                      }}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      Upload Image
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
                value={blogData?.type}  // Add this line to properly set the selected value
                onChange={(event) =>
                  setBlogData({ ...blogData, type: event.target.value })
                }
              >
                <option value='Regular'>Regular</option>
                <option value='Featured'>Featured</option>
              </select>
            </div>

          </div>
          

          <div className='flex justify-between gap-2'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='date' className='block text-gray-600'>
              Date
              </label>
              <input
                value={blogData?.date}
                onChange={event =>
                  setBlogData({ ...blogData, date: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='date'
                id='date'
                type='date'
                placeholder='Date'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='author' className='block text-gray-600'>
              Author
              </label>
              <input
                value={blogData?.author}
                onChange={event =>
                  setBlogData({ ...blogData, author: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='author'
                id='author'
                type='text'
                placeholder='author'
                required
              />
            </div>
          </div>

          <div className='space-y-1 text-sm'>
            <label htmlFor='blog' className='block text-gray-600'>
              Blog
            </label>

            <textarea
              value={blogData?.blog}
              onChange={event =>
                setBlogData({ ...blogData, blog: event.target.value })
              }
              id='blog'
              className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
              name='blog'
            ></textarea>
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  )
}

export default UpdateBlogForm