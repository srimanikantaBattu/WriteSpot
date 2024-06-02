import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
function Register() {
  const [userData,setUserData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const changeInputHandler = (e) =>{
    setUserData(prevState=> {return {...prevState , [e.target.name]:e.target.value}}) 
  }
  const registerUser = async (e)=>{
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,userData);
      const newUser = await response.data;
      console.log(newUser)
      if(!newUser)
        {
          setError("Couldn't Register. Please Try Again")
        }
        navigate('/login')
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <section className="register">
      <div className="containers">
        <h2>Signup</h2>
        <form onSubmit={registerUser} className='forms register__form'>
         { error && <p style={{color:"white"}} className='form__error-message'>{error}</p> }
          <input type="text" name="name" id="name" autoFocus placeholder='Full Name' value={userData.name} onChange={changeInputHandler} />
          <input type="email" name="email" id="email" placeholder='Email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" name="password" id="password" placeholder='Password' value={userData.password} onChange={changeInputHandler} />
          <input type="password" name="password2" id="password2" placeholder='Confirm Password' value={userData.password2} onChange={changeInputHandler} />
          <button style={{color:"white"}} type="submit" className='btns primarys'>Register</button>
        </form>
        <small>Already have an account?  <Link className='helo' to='/login'>Signin</Link></small>
      </div>
    </section>
  )
}

export default Register