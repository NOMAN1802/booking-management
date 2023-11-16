/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Container from '../../components/Container/Container';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const ManageBlogs = () => {

    const { data: blogs = [], refetch } = useQuery(['blogs'], async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`)
        return res.json()
    })

    const handleApproveBlog = blog => {
        fetch(`${import.meta.env.VITE_API_URL}/blogs/approved/${blog._id}`, {
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
                        title: `${blog.destination} is approved for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeniedBlog = blog => {
        fetch(`${import.meta.env.VITE_API_URL}/blogs/denied/${blog._id}`, {
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
                        title: `${blog.destination} is denied for booking!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <Container>

        <SectionTitle 
           subHeading={"Approve Blogs for Post"}
           heading={"Manage Blog"}
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
                            <th>Destination</th>
                            <th>Location</th>
                            <th>Host</th>
                            
                            <th>Status</th>
                            <th>Approved </th>
                            <th>Denied</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs?.map((blog, index) => <tr
                                key={blog._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={blog.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {blog.title}
                                </td>
                                <td>{blog.location}</td>

                                <td>
                                    {blog?.host?.name}
                                </td>
                                
                                <td>
                                    {blog?.status}
                                </td>

                                <td>{blog.status === 'approve' ? 'approve' :
                                    <button onClick={() => handleApproveBlog(blog)} className="btn btn-ghost  bg-black opacity-30  text-white"><FcApproval></FcApproval></button>}
                                </td>
                                
                                <td>
                                    {blog.status === 'denied' ? 'denied' :
                                        <button onClick={() => handleDeniedBlog(blog)} className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FcDisapprove></FcDisapprove></button>
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

export default ManageBlogs;