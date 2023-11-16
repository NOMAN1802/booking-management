/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { deleteCar } from '../../api/cars';
import DeleteModal from '../../components/Modal/DeleteModal';
import { FaSync, FaTrash } from 'react-icons/fa';
import UpdateCarModal from '../../components/Modal/UpdateCarModal';
import Swal from 'sweetalert2';

const HostAddedCarRow = ({ index,car, refetch }) => {

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
        deleteCar(id)
            .then(data => {
                console.log(data)
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Car deleted successfully',
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
                        <img src={car?.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                {car?.title}
            </td>
            <td>{car?.location}</td>
            <td>
                {car?.booked === true ? 'Not Available' : 'Available'}
            </td>
            <td>
                {car?.status}
            </td>


            <td onClick={() => setIsOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaTrash />Delete
                </button>
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={car._id}
                />
            </td>
            <td onClick={() => setIsEditModalOpen(true)}>

                <button className="btn btn-ghost bg-black opacity-30 rounded-2xl text-white"><FaSync />Update
                </button>
                <UpdateCarModal isOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    refetch={refetch}
                    car={car}
                    id={car._id}
                />
            </td>
        </tr>
    );
};

export default HostAddedCarRow;