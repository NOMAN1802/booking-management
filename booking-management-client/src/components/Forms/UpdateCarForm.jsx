/* eslint-disable no-unused-vars */
import React from 'react'
import { DateRange } from 'react-date-range'
import { TbFidgetSpinner } from 'react-icons/tb';
import { carCategories } from '../Categories/carCategoriesData'
const UpdateCarForm = ({
  handleSubmit,
  dates,
  handleDates,
  loading,
  handleImageUpdate,
  carData,
  setCarData,
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
              value={carData?.location}
              onChange={event =>
                setCarData({ ...carData, location: event.target.value })
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
              value={carData?.title}
              onChange={event =>
                setCarData({ ...carData, title: event.target.value })
              }
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='title'
              id='title'
              type='text'
              placeholder='Title'
              required
            />
          </div>

          <div className='space-y-1 text-sm'>
            <label htmlFor='category' className='block text-gray-600'>
              Category
            </label>
            <select
              onChange={event =>
                setCarData({ ...carData, category: event.target.value })
              }
              required
              defaultValue={carData.category}
              className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
              name='category'
            >
              {carCategories.map(category => (
                <option value={category.label} key={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-1'>
            <label htmlFor='date' className='block text-gray-600'>
              Select Availability Range
            </label>
            <div className='flex justify-center pt-2'>
              <DateRange
                onChange={handleDates}
                ranges={[dates]}
                rangeColors={['#F43F5E']}
              />
            </div>
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
                value={carData?.type}  // Add this line to properly set the selected value
                onChange={(event) =>
                  setCarData({ ...carData, type: event.target.value })
                }
              >
                <option value='Regular'>Regular</option>
                <option value='Featured'>Featured</option>
              </select>
            </div>

          </div>
          <div className='flex justify-between gap-2'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='price' className='block text-gray-600'>
                Price
              </label>
              <input
                value={carData?.price}
                onChange={event =>
                  setCarData({ ...carData, price: parseInt(event.target.value, 10) || 0, })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='price'
                id='price'
                type='number'
                placeholder='Price'
                required
              />
            </div>


            <div className='space-y-1 text-sm'>
              <label htmlFor='seat' className='block text-gray-600'>
                Total Seat
              </label>
              <input
                value={carData?.total_seat}
                onChange={event =>
                  setCarData({ ...carData, total_seat: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='total_seat'
                id='total_seat'
                type='number'
                placeholder='Total seat'
                required
              />
            </div>
          </div>

          <div className='flex justify-between gap-2'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='doors' className='block text-gray-600'>
              Total door
              </label>
              <input
                value={carData?.doors}
                onChange={event =>
                  setCarData({ ...carData, doors: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='doors'
                id='doors'
                type='number'
                placeholder='Doors'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='baggage' className='block text-gray-600'>
                Baggage
              </label>
              <input
                value={carData?.baggage}
                onChange={event =>
                  setCarData({ ...carData, baggage: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='baggage'
                id='baggage'
                type='number'
                placeholder='Baggage'
                required
              />
            </div>
          </div>

          <div className='space-y-1 text-sm'>
            <label htmlFor='description' className='block text-gray-600'>
              Description
            </label>

            <textarea
              value={carData?.description}
              onChange={event =>
                setCarData({ ...carData, description: event.target.value })
              }
              id='description'
              className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
              name='description'
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

export default UpdateCarForm