/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Container from '../../components/Container/Container';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const ManageRooms = () => {

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