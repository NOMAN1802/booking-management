/* eslint-disable no-unused-vars */
import React from 'react';
import qs from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RoomCategoryCard = ({ label, image, selected }) => {
    const [params, setParams] = useSearchParams()

    const navigate = useNavigate();

    const handleClick = () => {
      let currentQuery = {}
      if (params) {
        currentQuery = qs.parse(params.toString())
      }
      const updatedQuery = {
        ...currentQuery,
        category: label,
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
        <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-start 
        justify-start 
        p-3
        border-2
        gap-3
        group
        transition
        cursor-pointer
        ${
          selected
            ? 'border-b-neutral-800 text-neutral-800'
            : ' text-neutral-500'
        }
     
      `}
    >
      <img className='group-hover:scale-110 ' src={image} alt="" />
      <div className='text-sm font-medium'>{label}</div>
    </div>
    );
};

export default RoomCategoryCard;