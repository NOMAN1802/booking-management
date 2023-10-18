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
                element:<PrivateRoute>
                    <RoomDetails/> 
                </PrivateRoute>    
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
        path:'/',
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
         
        ]
    },

  ])


