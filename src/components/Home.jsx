import React from 'react'
import Welcome from '../assets/welcome.svg';

const Home = () => {
  return (
    <div>
        <div className="bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] min-h-screen ">
            <div className='max-w-7xl mx-auto'>
            <div className=' py-20'>
                  <img 
                                src={Welcome} 
                                alt="welcome page" 
                                className="w-full h-auto object-contain "
                              />
                
            </div>
            </div>
        </div>
            
            
    </div>
  )
}

export default Home