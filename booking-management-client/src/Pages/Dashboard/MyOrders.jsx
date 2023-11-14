/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Container from '../../components/Container/Container';
import MyOrdersRow from './MyOrdersRow';
import { getBookings } from '../../api/bookings';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Heading from '../../components/Heading/Heading';
import { useLocation } from 'react-router-dom';

const MyOrders = () => {

  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const location = useLocation()
  const fetchBookings = () => getBookings(user?.email).then(data => setBookings(data))
   
  useEffect(()=>{
    fetchBookings()
  },[])

 
    return (
        <Container>
         <SectionTitle
        subHeading={location.pathname === '/dashboard/myDashboard' ? 'My dashboard' : 'My booking Info'}
        heading={location.pathname === '/dashboard/myDashboard' ? 'My Dashboard' : 'My booking'}
      ></SectionTitle>
          
        {bookings && bookings.length >0 ? (
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
                            <th>Price</th>
                            <th>Delete</th>
                           


                        </tr>
                    </thead>
                    <tbody>
                 { bookings &&
                  bookings.map((booking, index) =><MyOrdersRow
                  index={index}
                  key={booking?._id}
                  booking={booking}
                  fetchBookings={fetchBookings}
                  
                  />
                 )}


                    </tbody>
                    


                </table>
            </div>
        </div>
        ) : (
            <div className='pt-12'>
          <Heading
            title={location.pathname === '/dashboard/myDashboard' ? 'No activity found' : 'You do not order anything yet!'}
            subtitle= {location.pathname === '/dashboard/myDashboard' ? 'Browse  ibooking for find your match' : 'Explore ibooking and order what you need'}
            center={true}
          />
        </div>
        )}
    </Container>
    );
};

export default MyOrders;