/* eslint-disable no-unused-vars */
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useLocation } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import { useQuery } from '@tanstack/react-query';
import HostAddedCarRow from './HostAddedCarRow';

const HostAddedCar = () => {

    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation()
    const { refetch, data: cars = [] } = useQuery({
        queryKey: ['cars', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/cars/${user?.email}`
            )
            console.log('res from axios', res.data)
            return res.data
        },
    })

    return (

        <Container>
            <SectionTitle
                subHeading={location.pathname === '/dashboard/hostDashboard' ? 'My Added Car Info' : 'No Car added yet!'}
                heading={location.pathname === '/dashboard/hostDashboard' ? 'My Added Cars' : 'My Added car'}
            ></SectionTitle>

            {cars && cars.length > 0 ? (
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
                                <th>Car Status</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Update</th>
                                
    
                            </tr>
                            </thead>
                            <tbody>
                                {cars &&
                                    cars.map((car, index) => <HostAddedCarRow
                                        index={index}
                                        key={car?._id}
                                        car={car}
                                        refetch={refetch}

                                    />
                                    )}


                            </tbody>



                        </table>
                    </div>
                </div>
            ) : (
                <div className='pt-12'>
                    <Heading
                        title={location.pathname === '/dashboard/hostDashboard' ? 'No activity found' : 'You do not add any  car yet!'}
                        subtitle={location.pathname === '/dashboard/hostDashboard' ? 'Go to add car and add some car for booking ' : 'Explore ibooking and add  your car'}
                        center={true}
                    />
                </div>
            )}
        </Container>

    );
};

export default HostAddedCar;