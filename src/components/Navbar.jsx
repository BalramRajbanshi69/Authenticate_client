import React, { useState } from 'react'
import { useRef } from 'react';
import {Link, useNavigate}  from 'react-router-dom';
import { IoIosLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isAuthenticated = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

   const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    toast.success("LoggedOut successfully!")
    navigate("/login")
  }
  return (
    <div className='fixed top-0 left-0 w-full z-50'>
        <div className='bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] shadow-lg'>
            <div className='max-w-7xl mx-auto px-4'>
                <nav className='flex justify-between items-center py-4 md:py-6'>
                    <Link to="/" className='text-white text-xl md:text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105'>
                        Authentication
                    </Link>


                          {/* Login/Logout with Dropdown */}
                                {isAuthenticated ? (
                                    <div className="relative" ref={dropdownRef}>
                                        <button onClick={toggleDropdown} className="font-semibold cursor-pointer text-[18px]  transition-colors">
                                            <FaRegUserCircle size={35} color='#099937ff' className='mt-1'/>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-[#1F2B6C] ring-1 ring-black ring-opacity-5">
                                                <div className="py-1 flex flex-col">
                                                    <button
                                                        onClick={handleLogout}
                                                        className=" text-left cursor-pointer px-4 py-2 text-md text-white hover:bg-gray-700"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="font-semibold transition-colors cursor-pointer text-[18px]"
                                    >
                                        <IoIosLogIn size={35} color='#7d1e0dff' />
                                    </Link>
                                )}

                    {/* Hamburger Menu Button */}
                    <button 
                        className='md:hidden text-white'
                        onClick={toggleMenu}
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                </nav>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className='md:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <Link 
                                to="/login" 
                                className='block text-white font-semibold py-2 px-4 text-lg transition-all duration-300 hover:bg-[#5a8341]'
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/" 
                                className='block text-white font-semibold py-2 px-4 text-lg transition-all duration-300 hover:bg-[#5a8341]'
                                onClick={toggleMenu}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar