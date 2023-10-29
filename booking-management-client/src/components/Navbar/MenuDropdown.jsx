/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown,FaRegSun, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaUsersGear,FaBlog } from 'react-icons/fa6';
import { BsBuildingGear } from 'react-icons/bs';
import { AiOutlineCar} from 'react-icons/ai'
import { AiOutlineDashboard, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useHost from '../../hooks/useHost';
import useGuest from '../../hooks/useGuest';

const MenuDropdown = ({ user, logOut }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMouseEnter = () => {
    setMenuOpen(true);
  };
  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  const [isAdmin] = useAdmin();
  const [isHost] = useHost();
  const [isGuest] = useGuest();
  return (
    <div className='flex items-center'>
      <div className="w-24 rounded-full">
        <img
          className='relative inline-block h-12 w-12 rounded-full object-cover object-center'
          src={user?.photoURL}
          alt="User Profile"
        />
      </div>
      <Menu as='li' className='relative inline-block text-left bg-white z-[999]' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='cursor-pointer'>
          <Menu.Button
            tabIndex={0}
            className='hover:text-pink-400 transition cursor-pointer  mb-2 lg:mb-0 text-base font-medium'

          >
            <span className='m-auto text-pink-400 transition  hover:border-pink-500 cursor-pointer font-medium'>
              {user?.displayName}
            </span>
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
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1'>

              {
                isAdmin ? 
                (
                     <>
                        <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/adminDashboard'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <AiOutlineDashboard className='mr-2'></AiOutlineDashboard>
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/manageUsers'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <FaUsersGear className='mr-2'></FaUsersGear>
                    Manage Users
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/manageRooms'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <BsBuildingGear className='mr-2'></BsBuildingGear>
                    Manage Rooms
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/manageBlogs'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <FaBlog className='mr-2'></FaBlog>
                    Manage Blogs
                  </Link>
                )}
              </Menu.Item>
                     </>

                ) :
                isHost ? 
                (
                  <>
                             <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/hostDashboard'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <AiOutlineDashboard className='mr-2'></AiOutlineDashboard>
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/addRoom'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <BsBuildingGear className='mr-2'></BsBuildingGear>
                    Add Room
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/addCar'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <AiOutlineCar className='mr-2'></AiOutlineCar>
                    Add Car
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/AddBlog'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <FaBlog className='mr-2'></FaBlog>
                    Add Blog
                  </Link>
                )}
              </Menu.Item>
                  </>
                ) :

                (
                  <>
                  <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/myDashboard'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <AiOutlineDashboard className='mr-2'></AiOutlineDashboard>
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/myDashboard'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <FaRegSun className='mr-2'></FaRegSun>
                    Settings
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/wishlist'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <AiOutlineHeart className='mr-2'></AiOutlineHeart>
                    Wishlist
                  </Link>
                )}
              </Menu.Item>
                  
                  </>
                )
              }
              
              {/* common */}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='dashboard/profile'
                    className={`${active && 'bg-gray-100 text-pink-400'} group flex w-full items-center rounded-md px-2 py-2 text-base font-thin`}
                  >
                    <FaRegUserCircle className='mr-2'></FaRegUserCircle>
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item className='w-full hidden md:flex py-2  bg-gray-200 '>
                <div onClick={() => {
                      logOut();
                    }} className='flex items-center cursor-pointer'>
                  <FaSignOutAlt className='mx-2 font-thin' />
                  <p
                    
                    className='bg-base-100 hover:bg-base-200 text-slate-400 rounded-md flex items-start justify-start'
                    
                  >
                    Logout
                  </p>
                </div>
              </Menu.Item>
             
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuDropdown;
