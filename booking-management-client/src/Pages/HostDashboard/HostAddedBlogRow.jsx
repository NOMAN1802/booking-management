/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { deleteBlog } from '../../api/blogs';
import DeleteModal from '../../components/Modal/DeleteModal';
import { FaSync, FaTrash } from 'react-icons/fa';
import UpdateBlogModal from '../../components/Modal/UpdateBlogModal';
import Swal from 'sweetalert2';

const HostAddedBlogRow = ({ index,blog, refetch }) => {

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
        deleteBlog(id)
            .then(data => {
                console.log(data)
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Blog deleted successfully',
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
                        <img src={blog?.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
               {blog?.title}
            </td>
            <td>{blog?.location}</td>
            
            <td>
                {blog?.status}
            </td>


            <td onClick={() => setIsOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaTrash />Delete
                </button>
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={blog?._id}
                />
            </td>
            <td onClick={() => setIsEditModalOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaSync />Update
                </button>
                <UpdateBlogModal isOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    refetch={refetch}
                    blog={blog}
                    id={blog?._id}
                />
            </td>
        </tr>
    );
};

export default HostAddedBlogRow;