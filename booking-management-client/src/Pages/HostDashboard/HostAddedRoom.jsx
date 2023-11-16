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
import HostAddedRoomRow from './HostAddedRoomRow';

const HostAddedRoom = () => {

    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation()
    const { refetch, data: rooms = [] } = useQuery({
        queryKey: ['rooms', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/rooms/${user?.email}`
            )
            console.log('res from axios', res.data)
            return res.data
        },
    })

    return (

        <Container>
            <SectionTitle
                subHeading={location.pathname === '/dashboard/hostDashboard' ? 'My Added Room Info' : 'No Room added yet!'}
                heading={location.pathname === '/dashboard/hostDashboard' ? 'My Added room' : 'My Added room'}
            ></SectionTitle>

            {rooms && rooms.length > 0 ? (
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
                                <th>Room Status</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Update</th>
                                
    
                            </tr>
                            </thead>
                            <tbody>
                                {rooms &&
                                    rooms.map((room, index) => <HostAddedRoomRow
                                        index={index}
                                        key={room?._id}
                                        room={room}
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
                        title={location.pathname === '/dashboard/hostDashboard' ? 'No activity found' : 'You do not add any  room yet!'}
                        subtitle={location.pathname === '/dashboard/hostDashboard' ? 'Go to add room and add some room for booking ' : 'Explore ibooking and add  your room'}
                        center={true}
                    />
                </div>
            )}
        </Container>

    );
};

export default HostAddedRoom;