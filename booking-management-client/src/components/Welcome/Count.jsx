/* eslint-disable no-unused-vars */
import React from "react";
import NumberCounter from 'number-counter';

const Count = ({ item }) => {
  console.log(item);
  const { count, image, name } = item;
  return (
    <div className="mt-10 mx-auto">
      <img src={image} className="w-32 rounded-full" alt="" />
      <p className="text-4xl text-center my-2"><span><NumberCounter end={count} className='inline-block'></NumberCounter></span>K</p>
      <p className="text-center text-sm text-gray-500">{name}</p>
    </div>
  );
};

export default Count;