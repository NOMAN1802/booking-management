import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NestedDropdown from './NestedDropdown';

const ServiceDropdown = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };
  return (
    <Menu as='li' className='relative inline-block text-left bg-white z-[999]' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <div className='cursor-pointer'>
      <Menu.Button
        tabIndex={0}
        className='hover:text-pink-400  transition border-b-2 border-white hover:border-pink-400 cursor-pointer mb-2 lg:mb-0 text-base font-medium'
        
      >
        Service{' '}
        <FaChevronDown
          className='inline-block ml-1'
          size={12}
          
        />
      </Menu.Button>
    </div>
    <Transition
      show={menuOpen}
      as={React.Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
        <Menu.Items className='absolute  mt-2 w-56 origin-top-right divide-y divide-gray-200  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/' // Replace with your hotels route
                  className={`${
                    active && 'bg-gray-100 text-pink-400'
                  } group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >

                  Hotel
                  {/* <NestedDropdown
                    label="Hotel"
                    subItems={[
                      { label: "Hotel Search Page", to: "/hotel-search" },
                      { label: "Single Hotel", to: "/single-hotel" },
                    ]}
                    
                  /> */}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/apartments' // Replace with your apartments route
                  className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >
                  Apartment
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/cars' // Replace with your cars route
                  className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >
                  Car
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/spaces' // Replace with your spaces route
                  className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >
                  Space
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/beauty' // Replace with your beauty route
                  className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >
                  Beauty
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/tours' // Replace with your tours route
                  className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                >
                  Tour
                </Link>
              )}
            </Menu.Item>
            {/* Add more menu items as needed */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ServiceDropdown;
