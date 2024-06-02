import React, { useState,useContext, useEffect } from 'react'
import { BsMoonStars } from "react-icons/bs";
import { CiBrightnessUp } from "react-icons/ci";
import './Navbar.css'
import {Link} from 'react-router-dom'
import img from '../../images/Logo.png'
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { UserContext } from '../../contexts/userContext';
function Navbar() {
  const {currentUser} = useContext(UserContext);
  const [isNavShowing,setIsNavShowing] = useState(window.innerWidth >800 ? true:false)
  const closeNavHandler =()=>{
    if(window.innerWidth<800)
      setIsNavShowing(false);
    else
    setIsNavShowing(true);
  }

const [theme,setTheme] = useState('light-theme');
const toggleTheme = () =>{
  console.log("HI");
  if(theme==="dark-theme")
    setTheme("light-theme");
  else
  setTheme("dark-theme");
closeNavHandler();
}
useEffect(()=>{
  document.body.className =theme;
},[theme])



  return (
    <nav>
    <div className="containers nav__containers">
      <Link onClick={closeNavHandler} to='/' className='nav__logo'>
        <img src={img} style={{width:"4rem" , height:"4rem"}} className='rounded-circle' alt="Navbar Logo"/>
        {/* <p className='ms-4 helo' style={{marginTop:"1.2rem"}}>WriteSpot</p> */}
      </Link>
      {currentUser?.id && isNavShowing && <ul className="nav__menu mt-2">
        <li><Link onClick={closeNavHandler} className='helo' to={`/profile/${currentUser.id}`}>{currentUser?.name}</Link></li>
        <li><Link onClick={closeNavHandler} className='helo' to='/create'>Create Post</Link></li>
        <li><Link onClick={closeNavHandler} className='helo' to='/authors'>Authors</Link></li>
        <li><Link onClick={closeNavHandler} className='helo' to='/logout'>Logout</Link></li>
        <li><Link style={{fontSize:"1.5rem"}} onClick={toggleTheme} className='helo' to='#'>
          {
            theme=='dark-theme'?<CiBrightnessUp />:<BsMoonStars />
          }
        
          </Link></li>
      </ul>}
      {!currentUser?.id && isNavShowing && <ul className="nav__menu mt-2">
        <li><Link onClick={closeNavHandler} className='helo' to='/authors'>Authors</Link></li>
        <li><Link onClick={closeNavHandler} className='helo' to='/login'>Login</Link></li>
        <li><Link style={{fontSize:"1.5rem"}}  onClick={toggleTheme} className='helo' to='#'>
        {
            theme=='dark-theme'?<CiBrightnessUp />:<BsMoonStars />
          }
          </Link></li>


      </ul>}
      <button className="nav__toggle-btn" onClick={()=>setIsNavShowing(!isNavShowing)}>
        {
          isNavShowing?<AiOutlineClose style={{color:"var(--loader-color)"}}  />:<FaBars style={{color:"var(--loader-color)"}} />
        }
      </button>
    </div>
    </nav>
  )
}

export default Navbar;