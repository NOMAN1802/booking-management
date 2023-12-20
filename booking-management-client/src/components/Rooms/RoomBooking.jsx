/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import Calendar from './Calender';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../Modal/BookingModal';
import useAdmin from '../../hooks/useAdmin';
import useHost from '../../hooks/useHost';

const RoomBooking = ({ roomData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isHost] = useHost();
  const closeModal = () => {
    setIsOpen(false);
  };
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: 'selection',
  });

  const [couponCode, setCouponCode] = useState('');

  const handleSelect = (ranges) => {
    const selectedRange = ranges.selection;
    const totalPrice =
      (selectedRange.endDate - selectedRange.startDate) / (1000 * 60 * 60 * 24) *
      roomData?.price;

    // Apply the coupon code discount
    const discountedPrice = applyCouponCode(totalPrice, couponCode);

    // Add 5% VAT to the discounted price
    const priceWithVAT = addVAT(discountedPrice);

    setBookingInfo({
      ...bookingInfo,
      price: priceWithVAT,
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

  const addVAT = (price) => {
    // Add 5% VAT to the price
    const vat = price * 0.05;
    return price + vat;
  };

  // Price Calculation
  const totalPrice =
    (value.endDate - value.startDate) / (1000 * 60 * 60 * 24) * roomData?.price;

  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData.title,
    roomId: roomData._id,
    image: roomData.image,
  });

  const handleApplyCoupon = () => {
    // Call your applyCouponCode function to calculate the discounted price
    const discountedPrice = applyCouponCode(totalPrice, couponCode);

    // Add 5% VAT to the discounted price
    // const priceWithVAT = addVAT(discountedPrice);
    const priceWithVATInCents = Math.round(addVAT(discountedPrice));

    // Update the bookingInfo with the discounted price and VAT
    setBookingInfo({
      ...bookingInfo,
      price: priceWithVATInCents,
    });
  };

  return (
    <div className='bg-white rounded border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-2 p-4 text-white bg-gray-400'>
        <div className='text-2xl font-semibold'>Price: ${roomData?.price}</div>
        <div className='font-light text-sm'>/night</div>
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
        <button
          className='bg-gray-400 p-4 text-white font-semibold text-center w-full'
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </button>
      </div>
      <hr />
      <div className='p-4'>
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData.host.email === user.email || roomData.booked || isAdmin || isHost}
          label='Book Now'
        />
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-sm'>
        <div>Subtotal</div>
        <div>${bookingInfo.price.toFixed(2)}</div>
      </div>
      <hr/>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-sm'>
        <div>VAT (5%)</div>
        <div>${(bookingInfo.price * 0.05).toFixed(2)}</div>
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${(bookingInfo.price + bookingInfo.price * 0.05).toFixed(2)}</div>
      </div>
      <BookingModal bookingInfo={bookingInfo} isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default RoomBooking;
