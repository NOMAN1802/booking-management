import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {  FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NestedDropdown = ({ label, subItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  return (
    <div className='group'>
      <Menu
        as='li'
        className='relative inline-block text-left bg-white z-[999]'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='cursor-pointer'>
          <Menu.Button
            tabIndex={0}
            className='text-pink-400 transition cursor-pointer mb-2 lg:mb-0 text-base font-normal flex items-center justify-between'
          >
             {menuOpen ? (
              <FaMinus className='inline-block mx-1' size={12} />
            ) : (
              <FaPlus className='inline-block mx-1' size={12} />
            )}
            <span>{label}</span>
            
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
          <Menu.Items className='right-0 left-0 mt-2 w-44 origin-top-left divide-y divide-gray-200   ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1'>
              {subItems &&
                subItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        to={item.to} // Replace with your route
                        className={`${active && 'bg-primary text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-normal`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NestedDropdown;
