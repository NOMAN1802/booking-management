/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from '../../components/Modal/DeleteModal';
import { deleteBooking, updateCarStatus, updateStatus } from '../../api/bookings';
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
      deleteBooking(id)
        .then(deleteData => {
          console.log('Booking deletion result:', deleteData);
    
          // Determine the item ID and update the status accordingly
          const itemId = booking?.roomId || booking?.carId;
    
          // Choose the appropriate update function based on the type of booking
          const updatePromise = booking?.roomId
            ? updateStatus(itemId, false)
            : booking?.carId
            ? updateCarStatus(itemId, false)
            : Promise.resolve(); 
    
          // Handle update status result
          updatePromise
            .then(updateData => {
              console.log('Status update result:', updateData);
    
              // Fetch updated bookings and show success message
              fetchBookings();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Booking canceled',
                showConfirmButton: false,
                timer: 1500,
              });
    
              // Close the modal
              closeModal();
            })
            .catch(updateError => {
              console.error('Error updating status:', updateError);
              // Handle error updating status if needed
    
              // Close the modal even in case of an error
              closeModal();
            });
        })
        .catch(deleteError => {
          console.error('Error deleting booking:', deleteError);
          // Handle error deleting booking if needed
    
          // Close the modal even in case of an error
          closeModal();
        });
    };
    
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
        {booking.title }
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