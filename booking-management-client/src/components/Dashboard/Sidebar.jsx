/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import { GrLogout } from 'react-icons/gr'
import { BsBuildingGear } from 'react-icons/bs'
import { FaBlog, FaUsersGear } from 'react-icons/fa6'
import { AiOutlineCar } from 'react-icons/ai'
import { AiOutlineBars, AiOutlineHeart } from 'react-icons/ai'
import { BsBell, BsFillHouseAddFill } from 'react-icons/bs'
import { FaClipboardList, FaHome, FaRegCreditCard, FaRegSun, FaRegUserCircle, FaUserAlt } from 'react-icons/fa'
import useAdmin from '../../hooks/useAdmin'
import useHost from '../../hooks/useHost'
const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState('false');
  const [isAdmin] = useAdmin();
  const [isHost] = useHost();


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold '>
            ibooking
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <Link to="/">
            <div className='w-full hidden md:flex py-2 justify-center items-center bg-rose-100 mx-auto'>
              ibooking
            </div>

          </Link>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              <>

                {/* Menu Links start */}

                {
                  isAdmin ?
                    (
                      <>
                        <NavLink
                          to='/dashboard/manageUsers'
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700  ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                          }
                        >
                          <FaUsersGear className='w-5 h-5'></FaUsersGear>
                          <span className='mx-4 font-medium'>Manage Users</span>
                        </NavLink>
                        <NavLink
                          to='/dashboard/manageRooms'
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                          }
                        >
                          <BsBuildingGear className='w-5 h-5'></BsBuildingGear>
                          <span className='mx-4 font-medium'>Manage Rooms</span>
                        </NavLink>
                        <NavLink
                          to='/dashboard/manageCars'
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                          }
                        >
                          <AiOutlineCar className='w-5 h-5'></AiOutlineCar>
                          <span className='mx-4 font-medium'>Manage Cars</span>
                        </NavLink>
                        <NavLink
                          to='/dashboard/manageBlogs'
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                          }
                        >
                           <FaBlog className='w-5 h-5'></FaBlog>
                          <span className='mx-4 font-medium'>Manage Blogs</span>
                        </NavLink>
                        <NavLink
                          to='/dashboard/profile'
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                          }
                        >
                          <FaRegUserCircle className='w-5 h-5'></FaRegUserCircle>
                          <span className='mx-4 font-medium'>Profile</span>
                        </NavLink>

                      </>
                    ) :
                    isHost ?
                      (

                        <>


                          <NavLink
                            to='/dashboard/addRoom'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <BsFillHouseAddFill className='w-5 h-5' />

                            <span className='mx-4 font-medium'>Add Room</span>
                          </NavLink>
                          <NavLink
                            to='/dashboard/addCar'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <AiOutlineCar className='w-5 h-5'></AiOutlineCar>
                            <span className='mx-4 font-medium'>Add Car</span>
                          </NavLink>
                          <NavLink
                            to='/dashboard/addBlog'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaBlog className='w-5 h-5'></FaBlog>
                            <span className='mx-4 font-medium'>Add Blog</span>
                          </NavLink>
                          <NavLink
                            to='/dashboard/profile'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaRegUserCircle className='w-5 h-5'></FaRegUserCircle>
                            <span className='mx-4 font-medium'>Profile</span>
                          </NavLink>
                        </>
                      )
                      :
                      (
                        <>

                          <NavLink
                            to='/dashboard/myOrders'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaClipboardList className='w-5 h-5'></FaClipboardList>
                            <span className='mx-4 font-medium'>My Orders</span>
                          </NavLink>

                          <NavLink
                            to='/dashboard/payment'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaRegCreditCard className='w-5 h-5'></FaRegCreditCard>
                            <span className='mx-4 font-medium'>Payment History</span>
                          </NavLink>

                          <NavLink
                            to='/dashboard/wishList'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <AiOutlineHeart className='w-5 h-5'></AiOutlineHeart>
                            <span className='mx-4 font-medium'>Wish List</span>
                          </NavLink>
                          <NavLink
                            to='/dashboard/profile'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaRegUserCircle className='w-5 h-5'></FaRegUserCircle>
                            <span className='mx-4 font-medium'>Profile</span>
                          </NavLink>
                          <NavLink
                            to='/dashboard/changePassword'
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                            }
                          >
                            <FaRegSun className='w-5 h-5'></FaRegSun>
                            <span className='mx-4 font-medium'>Change Password</span>
                          </NavLink>
                        </>
                      )
                }

                {/* Menu Links end */}
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <Link to='/'

            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <FaHome className='w-5 h-5' />

            <span className='mx-4 font-medium'>Home</span>
          </Link>
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>

        </div>


      </div>
    </>
  )
}

export default Sidebar

