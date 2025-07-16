import React from 'react';
import Navbar from '../../sharedFiles/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../sharedFiles/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;