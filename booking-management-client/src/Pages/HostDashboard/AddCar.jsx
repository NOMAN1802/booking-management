/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addCar } from '../../api/cars';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AddCarForm from '../../components/Forms/AddCarForm';

const AddCar = () => {
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    // handle submit form
    const handleSubmit = (event) =>{
        event.preventDefault();
        setLoading(true);
        const location = event.target.location.value;
        const destination = event.target.destination.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = event.target.price.value;
        const total_seat = event.target.total_seat.value;
        const baggage = event.target.baggage.value;
        const doors = event.target.doors.value;
        const description = event.target.description.value;
        const type = event.target.type.value;
        const image = event.target.image.files[0];

        // Upload Image
        imageUpload(image)
        .then(data =>{
            // console.log(data.data.display_url);
            const carData = {
                image : data.data.display_url,
                location,
                destination,
                 total_seat,
                 baggage,
                 doors,
                 description,
                 type,
                 price: parseFloat(price),
                 from, 
                 to,

                host:{
                 name : user?.displayName,
                 image: user?.photoURL,
                 email : user?.email,

                }

        
            }
            // Save room data in server
            addCar(carData).then(data =>{
                console.log(data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Car added successfully',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate('/dashboard/hostDashboard')
            }).catch(err => {
                console.log(err.message);
                // toast.error(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something  wrong in server!',
                  });
            })
            console.log(carData);
            setLoading(false)
        }).catch(err =>{
           console.log(err.message); 
           setLoading(false)
        })
        console.log(location);
    }
    const handleImageChange = image =>{
        setUploadButtonText(image.name);
    }
    const handleDates = ranges =>{
        //  return console.log(ranges.selection);
         setDates(ranges.selection)
    }
    return (
     <div>
        <AddCarForm handleSubmit={handleSubmit}
         loading={loading} 
         handleImageChange={handleImageChange}
        uploadButtonText={uploadButtonText}
        dates={dates}
        handleDates = {handleDates}
        />
     </div>
    );
};

export default AddCar;