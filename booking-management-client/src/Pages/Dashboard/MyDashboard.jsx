import React, { useContext } from 'react';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import MyOrders from './MyOrders';

const MyDashboard = () => {

    const {user} = useContext(AuthContext)
    const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    return res.json();
  });

  const handleHostRequest = guest => {
   
    fetch(`${import.meta.env.VITE_API_URL}/users/hostRequest/${guest.email}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${guest.name}'s host request sent!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

      
  };

  
  const specificUser = users.find(guest => guest.email === user?.email )
  return (
    <Container>
    <div className='flex justify-end'>
      {specificUser && (
        <button
          onClick={() => handleHostRequest(specificUser)}
          className="bg-gray-600 text-white text-xs text-center py-2 btn-sm font-thin rounded"
        >
          {specificUser.role === 'Make me Host' ? 'Request Sent' : 'Become a Host'}
        </button>
      )}
    </div>

    <MyOrders/>
  </Container>
  );
};

export default MyDashboard;
