import React from 'react';
import Registration from './Registration';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';



const Header = () => {
    return (
      
            <div className='flex justify-between list-none	'>
            <nav>
            <Link to='/' className="btn btn-active btn-primary">Home</Link>
            </nav>
            <nav className='flex gap-5'>
            <Link to='/registration' className="btn btn-active btn-secondary">Register</Link>
            <Link to='/login' className="btn btn-active btn-secondary">Sign In</Link>
            </nav>
        </div>
            
    );
};

export default Header;