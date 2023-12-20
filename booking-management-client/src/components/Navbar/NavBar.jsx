/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from '../../providers/AuthProvider';
import MenuDropdown from './MenuDropdown';
import ServiceDropdown from './ServiceDropdown';
import { useEffect } from 'react';
import SearchResults from '../../Pages/SearchResults/SearchResults';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [rooms, setRooms] = useState([])
  const [cars, setCars] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/rooms')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRooms(data);
      })
  }, [])
  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCars(data);
      })
  }, [])

  const handleSearch = () => {
    fetch(`http://localhost:5000/search/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.rooms || data?.cars) {
          setRooms(data.rooms || []);
          setCars(data.cars || []);
          setShowResult(true);
          navigate('/searchResults');
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };


  return (
    <nav className='z-50'>
      <div className='lg:h-10vh flex flex-col lg:flex-row lg:justify-between lg:p-5 px-6 lg:px-20 border-b'>
        <div className='flex items-center justify-between'>
          <Link to='/'> <h2 className='text-3xl font-bold text-black'><span className='text-gray-500'>i</span>Booking.</h2></Link>
          <button
            className='lg:hidden focus:outline-none'
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-6 w-6 ${isOpen ? 'text-pink-400' : 'text-black'}`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
        <ul
          className={`${isOpen ? 'flex flex-col' : 'hidden'
            } lg:flex lg:gap-8 lg:mr-16 mt-4 lg:mt-0 text-[18px] lg:flex-row`}
        >

          <li>
            <NavLink onClick={() => {
              setIsOpen(false);
              setShowResult(false); 
            }}
              to="/"
              className={({ isActive }) => (isActive ? "active1" : "default")}
              title="Home"
            >
              Home
            </NavLink>
          </li>


          <ServiceDropdown onClick={() => {
              setIsOpen(false);
              setShowResult(false); 
            }}/>
          <li>
            <div className="flex gap-4 p-1 text-end">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                className="p-1 w-full"
              />{" "}
              <button className='btn btn-sm btn-secondary' onClick={handleSearch}>Search</button>
            </div>
          </li>

          <li>
            <NavLink to='/blog'
              className={({ isActive }) => (isActive ? "active1" : "default")}
              title="Blog"
              onClick={() => {
                setIsOpen(false);
                setShowResult(false); 
              }}
              
              >
              Blog
            </NavLink>
          </li>
        </ul>

        <div className='flex items-center'>
          {user ? (
            <MenuDropdown
              user={user}
              logOut={logOut}
            />
          ) : (
            <Button />
          )}
        </div>
      </div>


      <>
        {showResult && (
          <SearchResults rooms={rooms} cars={cars} showResult={showResult} setShowResult={setShowResult}>

          </SearchResults>
        )}
      </>
    </nav>
  );
};

export default NavBar;
