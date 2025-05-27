import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Registeration from './components/Registeration';
import Home from './components/Home';
import Toast from './components/Toast';

const App = () => {
  return (
    <div className='pt-14'>
      <Router>
        <Navbar/>
        <Toast/>
        <Routes>
          <Route path="/" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App