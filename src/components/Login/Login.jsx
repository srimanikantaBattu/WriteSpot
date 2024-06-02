import React, { useState , useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Login.css'
import {UserContext} from '../../contexts/userContext'

function Login() {
  const [userData,setUserData] = useState({
    email:'',
    password:''
  })
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) =>{
    setUserData(prevState=> {return {...prevState , [e.target.name]:e.target.value}}) 
  }

  const loginUser = async (e)=>{
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData);
      const user = await response.data;
      console.log(user)
      setCurrentUser(user);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  return (
    <section className="register">
      <div className="containers">
        <h2>Sign In</h2>
        <form onSubmit={loginUser} className='forms login__form'>
          {error && <p style={{color:"white"}} className='form__error-message'>{error}</p>}
         
          <input type="email" name="email" id="" autoFocus placeholder='Email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" name="password" id="" placeholder='Password' value={userData.password} onChange={changeInputHandler} />
          
          <button style={{color:"white"}} type="submit" className='btns primarys'>Login</button>
        </form>
        <small>Dont have an account?  <Link className='helo' to='/register'>Signup</Link></small>
      </div>
    </section>
  )
}

export default Login