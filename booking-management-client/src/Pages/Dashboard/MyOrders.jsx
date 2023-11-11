/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Container from '../../components/Container/Container';
import MyOrdersRow from './MyOrdersRow';
import { getBookings } from '../../api/bookings';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const MyOrders = () => {

  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const fetchBookings = () => getBookings(user?.email).then(data => setBookings(data))
   
  useEffect(()=>{
    fetchBookings()
  },[])

 
    return (
        <Container>

<SectionTitle 
           subHeading={"My booking Info"}
           heading={"My booking"}
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
                            <th>Title/Destination</th>
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
    </Container>
    );
};

export default MyOrders;