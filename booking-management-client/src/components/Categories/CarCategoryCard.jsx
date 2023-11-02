/* eslint-disable no-unused-vars */
import React from 'react';
import qs from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CarCategoryCard = ({ label, image, selected,seat, bags }) => {
    const [param, setParam] = useSearchParams()

    const navigate = useNavigate();

    const handleClick = () => {
      let currentQuery = {}
      if (param) {
        currentQuery = qs.parse(param.toString())
      }
      const updatedQuery = {
        ...currentQuery,
        type: label,
      }
  
      const url = qs.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        { skipNull: true }
      )
  
      navigate(url)
    }
    return (    
    <div  onClick={handleClick} className="card card-side  bg-white shadow-xl">
    <figure><img className='group-hover:scale-110 w-[70%] ' src={image} alt="car"/></figure>
    <div className="card-body">
      <h2 className="card-title w-full">{label}</h2>
      <div className='text-gray-500 text-sm'>
      <p>Seats:{seat}</p>
      <p>Bags:{bags}</p>
      </div>
      <div className="card-actions justify-end">
        <button className='bg-slate-500 p-1 rounded text-white text-sm '> view details</button>
      </div>
    </div>
  </div>
    );
};

export default CarCategoryCard;