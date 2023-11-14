// import React, { useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { MdOutlineApartment } from "react-icons/md";
// import { AiOutlineCar } from "react-icons/ai";
// import Destination from "../SearchToggleComponent/Destination";
// import CheckTime from "../SearchToggleComponent/CheckTime";
// import { formatDate } from "../../utils/dateConvert";

// const SearchForm = ({ setRooms, setIsOpen }) => {
//   const [active, setActive] = useState(null);
//   const [location, setLocation] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");

//   const lists = [
//     {
//       title: (
//         <p className="bg-slate-500 text-white p-2 text-sm font-light rounded flex flex-row gap-1">
//           <MdOutlineApartment size={18} /> Rooms
//         </p>
//       ),
//     },
//     {
//       title: (
//         <p className="bg-slate-500 text-white py-2 px-6 text-sm font-light rounded flex flex-row gap-1">
//           <AiOutlineCar size={18} /> Cars
//         </p>
//       ),
//     },
//   ];

//   const handleToggle = (find) => {
//     setActive(find);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const searchQuery = {
//       location,
//       checkIn: formatDate(checkInDate),
//       checkOut: formatDate(checkOutDate),
//     };

//     // Fetch rooms from the server (or use your existing data)
//     fetch(`/rooms/search?location=${searchQuery.location}&checkIn=${searchQuery.checkIn}&checkOut=${searchQuery.checkOut}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle the data as needed (you can update your UI or perform other actions)
//         console.log("Search results:", data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   return (
//     <>
//       <div className="cursor-pointer pt-7 z-10">
//         <ul onClick={() => setIsOpen(false)} className="flex gap-10 justify-center">
//           {lists.map((list, index) => (
//             <li
//               className="text-[16px] text-gray-900 hover:text-gray-400 hover:border-b-2"
//               key={index}
//             >
//               {list.title}
//             </li>
//           ))}
//         </ul>

//         <form
//           className={`rounded w-[850px] border mt-10 grid grid-cols-11 bg-gray-100 z-20`}
//           onSubmit={handleSubmit}
//         >
//           <div
//             onClick={() => handleToggle("location")}
//             className={` px-4 py-3 ${
//               active === "location"
//                 ? "bg-white shadow-2xl  "
//                 : "hover:bg-[#EBEBEB]"
//             }   rounded-3xl col-span-4 `}
//           >
//             <div className="flex  gap-10 items-center  ">
//               <div>
//                 <p className="text-[13px] font-bold">Location</p>
//                 <input
//                   className={` placeholder-gray-400 outline-none bg-transparent bg-[#EBEBEB] text-sm  ${
//                     active === "location" && "bg-white "
//                   }`}
//                   name="location"
//                   placeholder="Search location"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             onClick={() => handleToggle("checkIn")}
//             className={` px-4 py-3 ${
//               active === "checkIn"
//                 ? "bg-white shadow-2xl hover:bg-white  "
//                 : "hover:bg-[#EBEBEB]"
//             }   rounded-3xl  col-span-2`}
//           >
//             <div className="flex  gap-10 items-center  ">
//               <div>
//                 <p className="text-[13px] font-bold"> Check in</p>
//                 <p className="text-gray-500 text-sm ">
//                   {checkInDate ? (
//                     <p className="font-semibold text-black">
//                       {formatDate(checkInDate)}
//                     </p>
//                   ) : (
//                     "Add dates"
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div
//             onClick={() => handleToggle("checkOut")}
//             className={` px-4 py-3 ${
//               active === "checkOut"
//                 ? "bg-white shadow-2xl hover:bg-white  "
//                 : "hover.bg-[#EBEBEB]"
//             }   rounded-3xl col-span-2 `}
//           >
//             <div className="flex  gap-10 items-center  ">
//               <div>
//                 <p className="text-[13px] font-bold">Check out</p>
//                 <p className="text-gray-500 text-sm ">
//                   {checkOutDate ? (
//                     <p className="font-semibold text-black">
//                       {formatDate(checkOutDate)}
//                     </p>
//                   ) : (
//                     "Add dates"
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div
//             onClick={() => handleToggle("guest")}
//             className={` px-4 py-3 ${
//               active === "guest"
//                 ? "bg-white shadow-2xl hover:bg-white  "
//                 : "hover.bg-[#EBEBEB]"
//             }   rounded-3xl flex gap-5 items-center col-span-3 `}
//           >
//             <div className=" bg-[#F62E56]  font-semibold rounded-full px-2 py-1 text-white flex  justify-between  ">
//               <div>
//                 <BiSearch size={26}></BiSearch>
//               </div>
//               <div>
//                 <button type="submit">Search</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="z-50">
//         {active === "location" && <Destination />}
//         {active === "checkIn" && <CheckTime />}
//         {active === "checkOut" && <CheckTime />}
//       </div>
//     </>
//   );
// };

// export default SearchForm;


//api

    // app.get("/rooms/search", async (req, res) => {
    //   const query = req.query;
    
    //   const checkIn = new Date(query.checkIn);
    //   const checkOut = new Date(query.checkOut);
    
    //   if (
    //     query.location &&
    //     checkIn instanceof Date && !isNaN(checkIn) && 
    //     checkOut instanceof Date && !isNaN(checkOut) 
    //   ) {
    //     const filter = {
    //       location: query.location,
    //       from: { $lte: checkIn },
    //       to: { $gte: checkOut }
    //     };
    
    //     const result = await roomsCollection.find(filter).toArray();
    //     res.send(result);
    //   } else {
    //     res.status(400).send("Invalid search parameters");
    //   }
    // });
    
    
//     app.get("/rooms/search", async (req, res) => {
//   const query = req.query;
//   const checkIn = new Date(query.checkIn);
//   const checkOut = new Date(query.checkOut);

//   if (
//     query.location &&
//     checkIn instanceof Date && !isNaN(checkIn) &&
//     checkOut instanceof Date && !isNaN(checkOut)
//   ) {
//     const allRooms = await roomsCollection.find().toArray();

//     const filteredRooms = allRooms.filter((room) => {
//       const validLocation = room.location === query.location;
//       const validCheckIn = new Date(room.from) <= checkIn;
//       const validCheckOut = new Date(room.to) >= checkOut;

//       return validLocation && validCheckIn && validCheckOut;
//     });

//     res.send(filteredRooms);
//   } else {
//     res.status(400).send("Invalid search parameters");
//   }
// });


// <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            //   <form onSubmit={handleSubmit}>
            //     <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            //       <div className='space-y-6'>
            //         <div className='space-y-1 text-sm'>
            //           <label htmlFor='location' className='block text-gray-600'>
            //             Location
            //           </label>
            //           <input
            //             className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
            //             name='location'
            //             id='location'
            //             type='text'
            //             placeholder='Location'
            //             required
            //           />
            //         </div>
        
                   
            //         <div className='space-y-1 text-sm'>
            //           <label htmlFor='type' className='block text-gray-600'>
            //             Type
            //           </label>
            //           <select
            //             required
            //             className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
            //             name='type'
            //           >
                       
            //               <option >
            //                 Regular
            //               </option>
            //               <option >
            //                 Featured
            //               </option>
                       
            //           </select>
            //         </div>
        
                    
            //       </div>
            //       <div className='space-y-6'>
            //         <div className='space-y-1 text-sm'>
            //           <label htmlFor='title' className='block text-gray-600'>
            //             Title
            //           </label>
            //           <input
            //             className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
            //             name='title'
            //             id='title'
            //             type='text'
            //             placeholder='Title'
            //             required
            //           />
            //         </div>
        
            //         <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
            //           <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
            //             <div className='flex flex-col w-max mx-auto text-center'>
            //               <label>
            //                 <input
            //                   onChange={event => {
            //                     handleImageChange(event.target.files[0]);
            //                   }}
            //                   className='text-sm cursor-pointer w-36 hidden'
            //                   type='file'
            //                   name='image'
            //                   id='image'
            //                   accept='image/*'
            //                   hidden
            //                 />
            //                 <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover-bg-rose-500'>
            //                   {uploadButtonText}
            //                 </div>
            //               </label>
            //             </div>
            //           </div>
            //         </div>
            //         <div className='flex justify-between gap-2'>
            //           <div className='space-y-1 text-sm'>
            //             <label htmlFor='price' className='block text-gray-600'>
            //               Price
            //             </label>
            //             <input
            //               className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
            //               name='price'
            //               id='price'
            //               type='number'
            //               placeholder='Price'
            //               required
            //             />
            //           </div>
        
            //           <div className='space-y-1 text-sm'>
            //             <label htmlFor='guest' className='block text-gray-600'>
            //               Total guest
            //             </label>
            //             <input
            //               className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
            //               name='total_guest'
            //               id='guest'
            //               type='number'
            //               placeholder='Total guest'
            //               required
            //             />
            //           </div>
            //         </div>
        
            //         <div className='flex justify-between gap-2'>
                      
        
                      
            //         </div>
        
            //         <div className='space-y-1 text-sm'>
            //           <label htmlFor='description' className='block text-gray-600'>
            //             Description
            //           </label>
        
            //           <textarea
            //             id='description'
            //             className='block rounded-md focus-rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 '
            //             name='description'
            //           ></textarea>
            //         </div>
        
          
            //       </div>
            //     </div>
        
            //     <button
            //       type='submit'
            //       className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
            //     >
            //       {loading ? (
            //         <TbFidgetSpinner className='m-auto animate-spin' size={24} />
            //       ) : (
            //         'Save & Continue'
            //       )}
            //     </button>
            //   </form>
            // </div>