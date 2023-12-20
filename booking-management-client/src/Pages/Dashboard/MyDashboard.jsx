/* eslint-disable no-unused-vars */
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

 
  return (
    <Container>

    <MyOrders/>
  </Container>
  );
};

export default MyDashboard;
