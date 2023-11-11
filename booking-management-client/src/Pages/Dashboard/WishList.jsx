/* eslint-disable no-unused-vars */
import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useState } from 'react';
import { getWishList } from '../../api/wishList';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useEffect } from 'react';
import WishCard from './WishCard';
import Heading from '../../components/Heading/Heading';

const WishList = () => {

    const { user } = useContext(AuthContext)
    
  const [wishList, setWistList] = useState([])
  const fetchWishList = () => getWishList(user?.email).then(data => {
    console.log(data);
    setWistList(data)
  })
   
  useEffect(()=>{
    fetchWishList()
  },[])
    return (
        <div>
            <SectionTitle
           subHeading={"My Wishlist"}
           heading={"Wishlist"}
           >
           </SectionTitle>  


       {wishList && wishList.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {wishList.map((list, index) => (
            <WishCard 
            key={index} 
            list={list} 
            fetchWishList={fetchWishList} />
          ))}
        </div>
      ) : (
        <div className='pt-12'>
          <Heading
            title='No Property added yet to Wish list!'
            subtitle='Add property to your Wish List.'
            center={true}
          />
        </div>
      )}
            
        </div>
    );
};

export default WishList;



