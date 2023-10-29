import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import MyDashboard from "../Pages/Dashboard/MyDashboard";
import Profile from "../Pages/Dashboard/Profile";
import Notification from "../Pages/Dashboard/Notification";
import MyOrders from "../Pages/Dashboard/MyOrders";
import WishList from "../Pages/Dashboard/WishList";
import PrivateRoute from './PrivateRoute'
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import LoginModal from "../components/Modal/LoginModal";
import SignUpModal from "../components/Modal/SignUpModal";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import HostDashboard from "../Pages/HostDashboard/HostDashboard";
import AddBlog from "../Pages/HostDashboard/AddBlog";
import AddRoom from "../Pages/HostDashboard/AddRoom";
import AddCar from "../Pages/HostDashboard/AddCar";
import ManageRooms from "../Pages/AdminDashboard/ManageRooms";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers";
import ManageBlogs from "../Pages/AdminDashboard/ManageBlogs";
import ManageCars from "../Pages/AdminDashboard/ManageCars";
import { getRoom } from "../api/rooms";
import CarDetails from "../Pages/CarDetails/CarDetails";
import { getCar } from "../api/cars";



  export const router = createBrowserRouter([

    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/room/:id',
                element:(<PrivateRoute>
                    <RoomDetails/> 
                </PrivateRoute>),
                loader:  ({params}) => getRoom(params.id)   
            },
            {
                path: '/car/:id',
                element:(<PrivateRoute>
                    <CarDetails/> 
                </PrivateRoute>),
                loader:  ({params}) => getCar(params.id)   
            }
        ]
    },
    {
        path:'/login',
        element:<LoginModal/>
      },
      {
        path:'/signup',
        element:<SignUpModal/>
      },
    {
        path:'dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'myDashboard',
                element:<MyDashboard></MyDashboard>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:'notification',
                element:<Notification></Notification>
            },
            {
                path:'myOrders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'wishList',
                element:<WishList></WishList>
            },
            {
                path: 'hostDashboard',
                element:<HostDashboard/>
            },
            {
                path: 'addRoom',
                element:<AddRoom/>
            },
            {
                path: 'addCar',
                element:<AddCar/>
            },
           {
               path:'addBlog',
               element:<AddBlog/>
           },

            {
                path: 'adminDashboard',
                element:<AdminDashboard/>
            },
            {
                path:'manageRooms',
                element:<ManageRooms/>,
            },
            {
                path:'manageCars',
                element:<ManageCars/>,
            },
            {
                path:'manageUsers',
                element: <ManageUsers/>
            },
            {
                path:'manageBlogs',
                element:<ManageBlogs/>
            }
           
          
         
        ]
    },

  ])


