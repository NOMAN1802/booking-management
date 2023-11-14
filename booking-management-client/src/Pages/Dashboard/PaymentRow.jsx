/* eslint-disable no-unused-vars */
import React from 'react';

const PaymentRow = ({index, pay, fetchBookings}) => {
    return (
        <tr>
            <td>
            {index + 1}
        </td>
        <td>
            <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={pay?.image} alt="Avatar Tailwind CSS Component" />
                </div>
            </div>
        </td>
        <td>
        {pay?.title }
        </td>
        <td>{pay?.transactionId}</td>

        <td>
        {pay?.price}
        </td>
        <td>
        {pay?.date}
        </td>

        </tr>
    );
};

export default PaymentRow;