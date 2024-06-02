import React,{useContext,useEffect} from 'react'
import {UserContext} from '../../contexts/userContext'
import {useNavigate} from 'react-router-dom';
function Logout() {
  const {setCurrentUser}  = useContext(UserContext);
  const navigate = useNavigate();
  setCurrentUser(null);
  navigate('/login')
  return (
    <div className="">

    </div>
  )
}

export default Logout