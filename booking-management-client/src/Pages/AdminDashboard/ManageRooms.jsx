/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Container from '../../components/Container/Container';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import { FaSync, FaTrash } from 'react-icons/fa';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import DeleteModal from '../../components/Modal/DeleteModal';
import UpdateRoomModal from '../../components/Modal/UpdateRoomModal';
import { deleteRoom } from '../../api/rooms';

const ManageRooms = () => {



    let [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



    const { data: rooms = [], refetch } = useQuery(['rooms'], async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
        return res.json()
    })

    const handleApproveRoom = room => {
        fetch(`${import.meta.env.VITE_API_URL}/rooms/approved/${room._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${room.title} is approved for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeniedRoom = room => {
        fetch(`${import.meta.env.VITE_API_URL}/rooms/denied/${room._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${room.title} is denied for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

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
        <Container>

            <SectionTitle
                subHeading={"Approve Rooms for booking"}
                heading={"Manage Rooms"}
            >
            </SectionTitle>
            <div className='rounded shadow-sm bg-gray-50 w-full sm:overflow-x-auto'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Photo</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Host</th>
                                <th>Booking Status</th>
                                <th>Status</th>
                                <th>Approved </th>
                                <th>Denied</th>
                                <th>Delete </th>
                                <th>Update</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms?.map((room, index) => <tr
                                    key={room._id}
                                >
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
                                        {room?.host?.name}
                                    </td>
                                    <td>
                                        {room?.booked === true ? 'Not Available' : 'Available'}
                                    </td>
                                    <td>
                                        {room?.status}
                                    </td>

                                    <td>{room.status === 'approve' ? 'approve' :
                                        <button onClick={() => handleApproveRoom(room)} className="btn btn-ghost  bg-black opacity-30  text-white"><FcApproval></FcApproval></button>}
                                    </td>

                                    <td>
                                        {room.status === 'denied' ? 'denied' :
                                            <button onClick={() => handleDeniedRoom(room)} className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FcDisapprove></FcDisapprove></button>
                                        }
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

                                </tr>)
                            }
                        </tbody>
                        {/* foot */}
                    </table>
                </div>
            </div>
        </Container>
    );
};

export default ManageRooms;