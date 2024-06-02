import React, { useState , useContext , useEffect} from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import {UserContext} from '../../contexts/userContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './UserProfile.css'
function UserProfile() {
  const [avatar, setAvatar] = useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [currentPassword,setCurrentPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [confirmNewPassword,setConfirmNewPassword]=useState('');
  const [error,setError] = useState('');
  const [isAvatar,setIsAvatar] = useState(false);

  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(()=>{
    if(!token)
      navigate('/login')
  },[])


const changeAvatarHandler = async ()=>{
  setIsAvatar(false);
  try {
    const postData = new FormData();
    postData.set('avatar',avatar);
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    setAvatar(response?.data.avatar)
  } catch (error) {
    console.log(error)
  }
}




useEffect(()=>{
  const getuser = async ()=>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    const {name,email,avatar} = response.data;
    setName(name);
    setEmail(email);
    setAvatar(avatar);
  }

getuser();

},[])


const updateUserDetails = async (e)=>{
  e.preventDefault();
  try {
    const userData = new FormData();
    userData.set('name',name);
    userData.set('email',email);
    userData.set('currentPassword',currentPassword);
    userData.set('newPassword',newPassword);
    userData.set('newConfirmPassword',confirmNewPassword);
  
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,userData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    if(response.status== 200)
      {
        // log user out
        navigate('/logout')
      }
  } catch (error) {
    setError(error.response.data.message)
  }


}



  return (
    <section>
      <div className="containers profile__container">
        <Link className="helos btnsy" to={`/myposts/${currentUser.id}`}>
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img className="profilepic" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            <form className="forms avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png,jpg,jpeg"
                onChange={(e) => setAvatar( e.target.files[0])}
              />
              <label style={{cursor:"pointer"}} onClick={()=>setIsAvatar(true)} htmlFor="avatar">
                <FaEdit style={{color:"white"}}></FaEdit>
              </label>
            </form>
            {isAvatar && <button style={{cursor:"pointer"}} onClick={changeAvatarHandler} className="profile__avatar-btn"><FaCheck style={{color:"white"}} /></button> }
          </div>
          <h1 style={{fontFamily:"fantasy",fontWeight:"200"}}>{currentUser.name}</h1>
          <form onSubmit={updateUserDetails} className="forms profile__form">
            {error && <p style={{color:"white"}} className="form__error-message">{error}</p>}
          <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Current Password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} />
          <input type="password" placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={e=>setConfirmNewPassword(e.target.value)} />
          <button style={{color:"white"}} type="submit" className="btns primarys">Update details</button>
          </form>
          
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
