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



  export const router = createBrowserRouter([

    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
         
        ]
    },
    {
        path:'/',
        element:<DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'/dashboard',
                element:<MyDashboard></MyDashboard>
            },
            {
                path:'dashboard/profile',
                element:<Profile></Profile>
            },
            {
                path:'/dashboard/notification',
                element:<Notification></Notification>
            },
            {
                path:'/dashboard/myOrders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/wishList',
                element:<WishList></WishList>
            },
         
        ]
    },

  ])


