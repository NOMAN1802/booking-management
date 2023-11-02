/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from '../../components/Modal/DeleteModal';
import { deleteBooking, updateStatus } from '../../api/bookings';
import Swal from 'sweetalert2';

const MyOrdersRow = ({booking, fetchBookings,index}) => {



    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
      setIsOpen(true)
    }
    function closeModal() {
      setIsOpen(false)
    }

    const modalHandler = id => {
      deleteBooking(id).then(data => {
        console.log(data)
        updateStatus(booking.roomId, false).then(data => {
          console.log(data)
          fetchBookings()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Booking cancel",
            showConfirmButton: false,
            timer: 1500,
          });
        })
      })
      closeModal()
    }
    return (
        
            
             <tr>
        <td>
            {index + 1}
        </td>
        <td>
            <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={booking.image} alt="Avatar Tailwind CSS Component" />
                </div>
            </div>
        </td>
        <td>
            {booking.title}
        </td>
        <td>{booking.location}</td>

        <td>
        {booking.price}
        </td>


        <td  onClick={() => setIsOpen(true)}>
           
                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaTrash/> 
                </button>
                <DeleteModal
                isOpen={isOpen}
               closeModal={closeModal}
               modalHandler={modalHandler}
               id={booking._id}
        />
        </td>
    </tr>
        
    );
};

export default MyOrdersRow;