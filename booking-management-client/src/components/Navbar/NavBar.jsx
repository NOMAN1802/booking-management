/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from '../../providers/AuthProvider';
import MenuDropdown from './MenuDropdown';
import ServiceDropdown from './ServiceDropdown';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
 

 

  return (
    <nav className='z-50'>
      <div className='lg:h-10vh flex flex-col lg:flex-row lg:justify-between lg:p-5 px-6 lg:px-20 border-b'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold text-black'>iBooking.</h2>
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
            <NavLink onClick={() => setIsOpen(false)}
                to="/"
                className={({ isActive }) => (isActive ? "active1" : "default")}
                title="Home"
              >
                Home
              </NavLink>
            </li>
         

          <ServiceDropdown
        
      />
           <li>
          <NavLink to='/blog'
            className={({ isActive }) => (isActive ? "active1" : "default")}
            title="Home"
           onClick={() => setIsOpen(false)}>
              Blog
          </NavLink>
          </li>
          <Link to='/singleSearch' onClick={() => setIsOpen(false)}>
            <li className='hover:text-pink-400 transition border-b-2 border-white hover:border-pink-400 cursor-pointer mb-2 lg:mb-0 text-base font-medium'>
              Single Search
            </li>
          </Link>
          <Link to='/contact' onClick={() => setIsOpen(false)}>
            <li className='hover:text-pink-400 transition border-b-2 border-white hover:border-pink-400 cursor-pointer mb-2 lg:mb-0 text-base font-medium'>
              Contact Us
            </li>
          </Link>
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
    </nav>
  );
};

export default NavBar;
