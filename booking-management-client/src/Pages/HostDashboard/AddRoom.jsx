/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/rooms';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to store selected facilities
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      
      setSelectedFacilities([...selectedFacilities, name]);
    } else {
     
      setSelectedFacilities(selectedFacilities.filter((selectedName) => selectedName !== name));
    }
  }

  // Handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const location = event.target.location.value;
    const title = event.target.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = event.target.price.value;
    const total_guest = event.target.total_guest.value;
    const bedrooms = event.target.bedrooms.value;
    const bathrooms = event.target.bathrooms.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const type = event.target.type.value;
    const image = event.target.image.files[0];

    // Upload Image
    imageUpload(image)
      .then((data) => {
        const roomData = {
          image: data.data.display_url,
          location,
          title,
          total_guest,
          bedrooms,
          bathrooms,
          description,
          category,
          type,
          price: parseFloat(price),
          from,
          to,
          facilities: selectedFacilities, 
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        // Save room data in the server
        addRoom(roomData)
          .then((data) => {
            console.log(data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Room added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/dashboard/hostDashboard');
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong on the server!',
            });
          });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };

  return (
    <div>
      <SectionTitle 
           subHeading={"Add your rooms for booking"}
           heading={"Add rooms"}
           >
           </SectionTitle>
      <AddRoomForm
        handleSubmit={handleSubmit}
        loading={loading}
        handleImageChange={handleImageChange}
        uploadButtonText={uploadButtonText}
        dates={dates}
        handleDates={handleDates}
        handleCbClick={handleCbClick}
        selected={selectedFacilities} 
      />
    </div>
  );
};

export default AddRoom;
