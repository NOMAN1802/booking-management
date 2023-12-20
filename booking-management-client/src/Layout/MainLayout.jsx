/* eslint-disable no-unused-vars */
import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';


const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
          
            
            <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;