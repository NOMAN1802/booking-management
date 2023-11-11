/* eslint-disable no-unused-vars */
import React from "react";

const Destination = () => {
  const destinationsImages = [
    {
      image:
        "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
      name: "I'm flexible",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320",
      name: "Europe",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/cd9f2bf0-eefc-4980-b7cb-9c8ca3dae883.jpg?im_w=320",
      name: "Canada",
    },
    {
      image:
        "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
      name: "Southeast Asia",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320",
      name: "United Kingdom",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/cd9f2bf0-eefc-4980-b7cb-9c8ca3dae883.jpg?im_w=320",
      name: "United States",
    },
  ];
  return (
    <div className="mt-[20px]  bg-white w-3/4 py-10 px-10 drop-shadow-2xl rounded-3xl  ">
      <p className="text-gray-600 text-sm   mb-5 font-semibold">
        Search by region
      </p>
      <div className="grid grid-cols-3 gap-5">
        {destinationsImages.map((destinationImage, index) => (
          <div key={index}>
            <img
              className="w-[200px] border rounded-xl hover:border-black"
              src={destinationImage?.image}
              alt=""
            />
            <p className="text-[14px] ">{destinationImage?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;