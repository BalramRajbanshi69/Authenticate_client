import React, { useState } from 'react'
import {Link}  from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
        <div className='bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] shadow-lg'>
            <div className='max-w-7xl mx-auto px-4'>
                <nav className='flex justify-between items-center py-4 md:py-6'>
                    <Link to="/" className='text-white text-xl md:text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105'>
                        Authentication
                    </Link>

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

                    {/* Desktop Menu */}
                    {/* <ul className='hidden md:flex space-x-6'>
                        <Link to="/login" className='text-white font-semibold text-lg md:text-xl transition-all duration-300 hover:scale-105'>
                            Login
                        </Link>
                    </ul> */}
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