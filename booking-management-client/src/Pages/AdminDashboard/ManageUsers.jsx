/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUser, FaUserShield } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Container from "../../components/Container/Container"
import Swal from 'sweetalert2';

const ManageUsers = () => {


    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`)
        return res.json()
    })
    
    const handleMakeAdmin = user => {
        fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`, {
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
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeHost = user => {
        fetch(`${import.meta.env.VITE_API_URL}/users/host/${user._id}`, {
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
                        title: `${user.name} is an Host Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <Container>

            <h1 className='text-center text-3xl text-gray-700 my-8 font-semibold'>All Users: {users.length}</h1>
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Make Admin</th>
                                <th>Make Host</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>

                                    <td>
                                        {user.role === 'Make me Host' ? 'Make me Host' : (user.role)}
                                    </td>

                                    <td>{user.role === 'admin' ? 'admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost  bg-black opacity-30  text-white"><FaUserShield></FaUserShield></button>
                                    }</td>

                                    <td>
                                        {user.role === 'host' ? 'host' :
                                            <button onClick={() => handleMakeHost(user)} className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaUser></FaUser></button>
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

export default ManageUsers;