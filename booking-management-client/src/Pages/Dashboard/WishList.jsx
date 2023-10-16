/* eslint-disable no-unused-vars */
import React from 'react';

const WishList = () => {
    return (
        <div>
            <h2>
                Wish List
            </h2>
            
        </div>
    );
};

export default WishList;

// /* eslint-disable no-unused-vars */
// import React, { useContext, useState } from 'react';
// import Container from '../../components/Container/Container';
// import { AuthContext } from '../../providers/AuthProvider';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const Profile = () => {
//   const { user, updateUserProfile } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data, event) => {
//     try {
//       // Extract image from the file input
//       const image = event.target.image.files[0];

//       if (!image) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Please select an image to upload!',
//         });
//         return;
//       }

//       setLoading(true);

//       // Image Upload to imgBB
//       const formData = new FormData();
//       formData.append('image', image);

//       const imgBBResponse = await fetch(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       if (!imgBBResponse.ok) {
//         console.error('imgBB API Error:', imgBBResponse.status);
//         const errorData = await imgBBResponse.json();
//         console.error('Error Data:', errorData);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Image upload failed!',
//         });
//         setLoading(false);
//         return;
//       }

//       const imgBBData = await imgBBResponse.json();
//       const imageUrl = imgBBData.data.display_url;

//       // Update the user's display name and photoURL
//       const displayName = `${data.firstName} ${data.lastName}`;
//       await updateUserProfile(displayName, imageUrl);

//       // Prepare user data to be sent to the server
//       const saveInfo = {
//         name: displayName,
//         photoURL: imageUrl,
//         email: data.email,
//         role: data.role,
//         phoneNumber: data.phoneNumber,
//         address: data.address,
//       };

//       // Send user data to the server using a PUT request
//       const response = await fetch(`http://localhost:5000/users/${user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(saveInfo),
//       });

//       if (response.ok) {
//         reset(); // Reset the form
//         Swal.fire({
//           position: 'top-end',
//           icon: 'success',
//           title: 'User Information Updated Successfully',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate('/'); // Navigate to the desired page
//       } else {
//         // Handle any errors from the server
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong on the server!',
//         });
//       }
//     } catch (error) {
//       // Handle any Firebase or other errors
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong with Firebase Authentication!',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <div className='max-h-screen max-w-screen bg-white rounded shadow-lg'>
//         <form className="w-full p-8 space-y-12" onSubmit={handleSubmit(onSubmit)}>
//           <h1 className='text-2xl font-normal'>Your Profile</h1>
//           {/* name */}
//           <div className="sm:flex-none md:flex gap-4">
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="firstName">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('firstName', { required: true })}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="lastName">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('lastName', { required: true })}
//               />
//             </div>
//           </div>
//           {/* email and phone number */}
//           <div className="sm-flex-none md-flex gap-4">
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('email', { required: true })}
//                 value={user?.email}
//                 readOnly
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="phoneNumber">
//                 Phone Number
//               </label>
//               <input
//                 type="number"
//                 id="phoneNumber"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('phoneNumber', { required: true })}
//               />
//             </div>
//           </div>
//           {/* image */}
//           <div>
//             <label htmlFor='image' className='block mb-2 text-sm'>
//               Avatar:
//             </label>
//             <input
//               required
//               type='file'
//               id='image'
//               name='image'
//               accept='image/*'
//             />
//           </div>
//           {/* address */}
//           <div className="flex flex-col">
//             <label htmlFor="address" className="text-normal text-gray-400">
//               Address
//             </label>
//             <textarea
//               className="w-2/3 rounded-md"
//               type="text"
//               id="address"
//               {...register('address', { required: true })}
//             />
//           </div>
//           {/* password  */}
//           <div className="sm-flex-none md-flex gap-4">
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('password')}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-normal text-gray-400" htmlFor="ConfirmPassword">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="ConfirmPassword"
//                 className="md-w-96 sm-w-full rounded-md pl-8"
//                 {...register('ConfirmPassword')}
//               />
//             </div>
//           </div>
//           <div className='w-1/3 mx-auto'>
//             <button
//               type='submit'
//               className='bg-blue-500 w-full rounded-md py-4 text-white'
//             >
//               Submit
//               </button>
//           </div>
//         </form>
//       </div>
//     </Container>
//   );
// };

// export default Profile;

