/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Options = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    'Hotel',
    'Apartment',
    'Car',
    'Space',
    'Beauty',
    'Tour',
  ];

  return (
    <div className="flex flex-row my-2 gap-2 cursor-pointer">

        {
            options.map((option, index)=>{
                <p key={index} className={`py-2 px-4 text-sm font-light rounded${
                    selectedOption === index
                      ? 'bg-gray-500 text-white'
                      : 'bg-white text-gray-700'

                  }`}
                  onClick={() => setSelectedOption(index)}
                  >
                             {option}
                </p>
            })
        }
     
    </div>
  );
};

export default Options;
