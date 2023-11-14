import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { addBooking, updateStatus, updateCarStatus } from '../../api/bookings';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2';

const CheckoutForm = ({closeModal,bookingInfo}) => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState();
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)

    //   1.  get clientSecret from backend
    useEffect(() => {
      if (bookingInfo.price > 0) {
        axiosSecure
          .post('/create-payment-intent', { price: bookingInfo.price })
          .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
          })
      }
    }, [bookingInfo, axiosSecure])
  
    const handleSubmit = async event => {
      event.preventDefault()
  
      if (!stripe || !elements) {
        return
      }
  
      const card = elements.getElement(CardElement)
      if (card === null) {
        return
      }
  
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })
  
      if (error) {
        console.log('error', error)
        setCardError(error.message)
      } else {
        setCardError('')
        // console.log('payment method', paymentMethod)
      }
  
      setProcessing(true)
  
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'unknown',
              name: user?.displayName || 'anonymous',
            },
          },
        })
  
      if (confirmError) {
        console.log(confirmError)
        setCardError(confirmError.message)
      }
  
      console.log('payment intent', paymentIntent)
  
      if (paymentIntent.status === 'succeeded') {
        // save payment information to the server
        const paymentInfo = {
          ...bookingInfo,
          transactionId: paymentIntent.id,
          date: new Date(),
        }
        axiosSecure.post('/bookings', paymentInfo)
  .then(res => {
    console.log(res.data);

    if (res.data.insertedId) {
      const itemId = bookingInfo?.roomId || bookingInfo?.carId;

      // Choose the appropriate update function based on the type of booking
      const updatePromise = bookingInfo?.roomId
        ? updateStatus(itemId, true)
        : bookingInfo?.carId
        ? updateCarStatus(itemId, true)
        : Promise.resolve(); 

      // Handle update status result
      updatePromise
        .then(updateData => {
          setProcessing(false);
          console.log(updateData);

          const text = `Booking Successful!, TransactionId: ${paymentIntent.id}`;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: text,
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/dashboard/myOrders');
          closeModal();
        })
        .catch(updateError => {
          setProcessing(false);
          console.error('Error updating status:', updateError);
          
        });
    }
  })
//   .catch(error => {
//     console.error('Error making booking:', error);
//     // Handle error making booking if needed
//   });
      }
    }
  

    
    return (
      <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        

        <div className='flex mt-2 justify-around'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={!stripe || processing || !clientSecret}
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    
                  >
                    {processing?<ImSpinner9 className='m-auto animate-spin' size={24}/> : `Pay ${bookingInfo.price}$`}
                  </button>
                </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
      </>
    );
  };

  export default CheckoutForm;