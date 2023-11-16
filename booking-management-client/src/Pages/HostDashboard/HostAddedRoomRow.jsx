/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { deleteRoom } from '../../api/rooms';
import DeleteModal from '../../components/Modal/DeleteModal';
import { FaSync, FaTrash } from 'react-icons/fa';
import UpdateRoomModal from '../../components/Modal/UpdateRoomModal';
import Swal from 'sweetalert2';

const HostAddedRoomRow = ({ index,room, refetch }) => {

    let [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = id => {
        console.log(id)
        deleteRoom(id)
            .then(data => {
                console.log(data)
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Room deleted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(err => console.log(err))
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
                        <img src={room.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                {room.title}
            </td>
            <td>{room.location}</td>
            <td>
                {room?.booked === true ? 'Not Available' : 'Available'}
            </td>
            <td>
                {room?.status}
            </td>


            <td onClick={() => setIsOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaTrash />Delete
                </button>
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={room._id}
                />
            </td>
            <td onClick={() => setIsEditModalOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaSync />Update
                </button>
                <UpdateRoomModal isOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    refetch={refetch}
                    room={room}
                    id={room._id}
                />
            </td>
        </tr>
    );
};

export default HostAddedRoomRow;