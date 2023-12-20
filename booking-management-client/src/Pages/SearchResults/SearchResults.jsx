/* eslint-disable no-unused-vars */
import React from 'react';
import Heading from '../../components/Heading/Heading';
import SearchRoomCard from '../../components/Navbar/SearchRoomCard';
import SearchCarCard from '../../components/Navbar/SearchCarCard';
import Container from '../../components/Container/Container';

const SearchResults = ({ rooms, cars,showResult, setShowResult }) => {
   const noResults = !rooms || !cars 

  
  return (
   
    <Container>
      <div onClick={()=> setShowResult (false)} className='pt-12 min-h-[70vh]'>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Render rooms */}
            {rooms && rooms.map((room) => (
              <SearchRoomCard key={room._id} room={room} showResult={showResult} />
            ))}

            {/* Render cars */}
            {cars && cars.map((car) => (
              <SearchCarCard key={car._id} car={car} />
            ))}
          </div>
        
      </div>
    </Container>
  );
};

export default SearchResults;
