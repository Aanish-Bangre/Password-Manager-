import React from 'react';

const Navbar = () => {
    return (
        <div className=''>
            <nav className="navbar bg-[#000000] text-white font-mono flex justify-around items-center py-4">
                <div className="navbar-logo">
                    <span className='text-3xl text-green-500'>&lt; </span>
                    <a href="/" className='text-2xl text-white'>Password </a>
                    <span className='text-2xl  font-bold text-green-500'>Manager</span>
                    <span className='text-[30px] text-green-500'> /&gt;</span>
                </div>
                <ul className="navbar-links flex gap-5">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;