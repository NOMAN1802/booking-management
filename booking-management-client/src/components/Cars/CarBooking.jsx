/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Calendar from './Calender';
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom';
import { addBooking, updateCarStatus } from '../../api/bookings';
import Swal from 'sweetalert2';
import BookingModal from '../Modal/BookingModal';
import { AuthContext } from '../../providers/AuthProvider';

const CarBooking = ({carData}) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState({
    startDate: new Date(carData?.from),
    endDate: new Date(carData?.to),
    key: 'selection',
  });

  const [couponCode, setCouponCode] = useState(''); 

  const handleSelect = (ranges) => {
    const selectedRange = ranges.selection;
    const totalPrice =
      (selectedRange.endDate - selectedRange.startDate) / (1000 * 60 * 60 * 24) *
      carData?.price;

    // Apply the coupon code discount
    const discountedPrice = applyCouponCode(totalPrice, couponCode);

    setBookingInfo({
      ...bookingInfo,
      price: discountedPrice,
      to: selectedRange.endDate,
      from: selectedRange.startDate,
    });

  
    setValue({
      startDate: selectedRange.startDate,
      endDate: selectedRange.endDate,
      key: 'selection',
    });
  };

  const applyCouponCode = (originalPrice, code) => {
    if (code === 'privateye') {
     
      return originalPrice * 0.9;
    }
    return originalPrice; 
  };
  // Price Calculation
  const totalPrice =
    (value.endDate - value.startDate) / (1000 * 60 * 60 * 24) * carData?.price;

  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: carData.host.email,
    location: carData.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    destination: carData.destination,
    carId: carData._id,
    image: carData.image,
  });

  const handleApplyCoupon = () => {
    // Call your applyCouponCode function to calculate the discounted price
    const discountedPrice = applyCouponCode(totalPrice, couponCode);
  
    // Update the bookingInfo with the discounted price
    setBookingInfo({
      ...bookingInfo,
      price: discountedPrice,
    });
  };
  

  const modalHandler = () => {
    addBooking(bookingInfo)
      .then((data) => {
        console.log(data);
        updateCarStatus(carData?._id, true)
          .then((data) => {
            console.log(data);

            // Update the bookingInfo with the coupon-discounted price
            const updatedBookingInfo = {
              ...bookingInfo,
              price: bookingInfo.price * 0.9,
            };

            setBookingInfo(updatedBookingInfo);

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Car Booked Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(bookingInfo);
            navigate('/dashboard/myOrders');
            closeModal();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='bg-white rounded border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-2 p-4 text-white bg-gray-400'>
        <div className='text-2xl font-semibold'>Price: ${carData?.price}</div>
        <div className='font-light text-sm'>/day</div>
      </div>
      <hr />
      <Calendar handleSelect={handleSelect} value={value} />

      <hr />
      <div className='p-4 flex gap-2'>
  <input
    type='text'
    placeholder='Enter Coupon Code'
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value)}
  />
  <button className='bg-gray-400 p-4 text-white font-semibold text-center w-full'
    onClick={handleApplyCoupon}
     > Apply Coupon</button>
  
</div>
      <hr />
      <div className='p-4'>
        <Button
          onClick={() => setIsOpen(true)}
          disabled={carData.host.email === user.email || carData.booked}
          label='Book Now'
        />
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${bookingInfo.price.toFixed(2)}</div>
      </div>
     

      <BookingModal
        modalHandler={modalHandler}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  )
}

export default CarBooking