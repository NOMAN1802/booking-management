/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Container from '../../components/Container/Container';
import { FcApproval, FcDisapprove } from 'react-icons/fc';

const ManageCars = () => {

    const { data: cars = [], refetch } = useQuery(['cars'], async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`)
        return res.json()
    })

    const handleApproveCar = car => {
        fetch(`${import.meta.env.VITE_API_URL}/cars/approved/${car._id}`, {
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
                        title: `${car.destination} is approved for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeniedCar = car => {
        fetch(`${import.meta.env.VITE_API_URL}/cars/denied/${car._id}`, {
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
                        title: `${car.destination} is denied for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <Container>

        <h1 className='text-center text-3xl text-gray-700 my-8 font-semibold'>All Cars: {cars.length}</h1>
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
                            <th>Destination</th>
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
                            cars?.map((car, index) => <tr
                                key={car._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={car.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {car.title}
                                </td>
                                <td>{car.location}</td>

                                <td>
                                    {car?.host?.name}
                                </td>
                                <td>
                                    {car?.booked === true ? 'Not Available' : 'Available'}
                                </td>
                                <td>
                                    {car?.status}
                                </td>

                                <td>{car.status === 'approve' ? 'approve' :
                                    <button onClick={() => handleApproveCar(car)} className="btn btn-ghost  bg-black opacity-30  text-white"><FcApproval></FcApproval></button>}
                                </td>
                                
                                <td>
                                    {car.status === 'denied' ? 'denied' :
                                        <button onClick={() => handleDeniedCar(car)} className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FcDisapprove></FcDisapprove></button>
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

export default ManageCars;