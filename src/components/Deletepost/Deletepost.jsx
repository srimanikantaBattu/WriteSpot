import React ,{useEffect,useContext, useState} from 'react'
import { UserContext } from '../../contexts/userContext';
import { useNavigate , useLocation , Link} from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';
function Deletepost({postId:id}) {
  const navigate = useNavigate();
  const location = useLocation();
  const {currentUser} = useContext(UserContext);
  const [isLoading,setIsLoading] = useState(false);
  const token = currentUser?.token;
  useEffect(()=>{
    if(!token)
      navigate('/login')
  },[])

const removePost = async ()=>{
  setIsLoading(true);
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
  if(response.status==200)
    {
      if(location.pathname==`/myposts/${currentUser.id}`){
        navigate(0)
      }
      else{
        navigate('/');
      }
    }
  } catch (error) {
    console.log("Could not delete the post")
  }
  setIsLoading(false);
}
if(isLoading)
  return <Loader />

  return (
    <Link style={{color:"white"}} onClick={()=>removePost(id)} className='helo btns sm danger'>Delete</Link>
  )
}

export default Deletepost