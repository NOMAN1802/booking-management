/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { getBookings } from '../../api/bookings';
import Heading from '../../components/Heading/Heading';
import PaymentRow from './PaymentRow';
import { useState } from 'react';
import { useEffect } from 'react';

const Payment= () => {
    const { user } = useContext(AuthContext)
  const [payment, setPayment] = useState([])
  const fetchBookings = () => getBookings(user?.email).then(data => setPayment(data))
   
  useEffect(()=>{
    fetchBookings()
  },[])
    return (
        <Container>
             <SectionTitle 
           subHeading={"My Payment Info"}
           heading={"Payment History"}
           >
           </SectionTitle>
           {payment && payment.length >0 ? (
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
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Payment Date</th>
                           


                        </tr>
                    </thead>
                    <tbody>
                 { payment &&
                  payment.map((pay, index) =><PaymentRow
                  index={index}
                  key={pay?._id}
                  pay={pay}
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
            title='You do not order anything yet!'
            subtitle='Explore ibooking and order what you need '
            center={true}
          />
        </div>
        )}
        </Container>
    );
};

export default Payment;