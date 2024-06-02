import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './index.css'
function RootLayout() {
  return (
    <div className="">
       <Navbar />
       <div className="" style={{minHeight:"40vh"}}>
       <Outlet />
       </div>
       <Footer />
    </div>
  )
}

export default RootLayout