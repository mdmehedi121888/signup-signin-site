import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    return (
        <div className='mx-10 mt-10'>
       <Header></Header>
       <div className='min-h-[calc(100vh-308px)]'>
       <Outlet></Outlet>
       </div>
        <Footer></Footer>
        <ToastContainer />
      </div>
    );
};

export default Home;