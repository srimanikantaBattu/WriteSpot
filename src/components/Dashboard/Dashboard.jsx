import React from 'react'
import {useEffect, useState , useContext} from 'react'
import {UserContext} from '../../contexts/userContext'
import './Dashboard.css'
import Loader from '../Loader'
import DeletePost from '../Deletepost/Deletepost'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate , useParams} from 'react-router-dom'
function Dashboard() {
  const [posts,setPosts] = useState([]);
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const [isLoading,setIsLoading]= useState(false);
  const {id} = useParams();
  useEffect(()=>{
    if(!token)
      navigate('/login')
  },[])



useEffect(()=>{
  const fetchPosts = async ()=>{
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
      setPosts(response.data)

    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }
  fetchPosts();
},[id])


if(isLoading)
  return <Loader />



  return (
    <section className='dashboard'>
      {
        posts.length? <div className="containers dashboard__container">
{
  posts.map(post=>{
    return <article key={post._id} className='dashboard__post'>
      <div className="dashboard__post-info">
        <div className="dashboard__post-thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <h5>{post.title}</h5>
      </div>
      <div className="dashboard__post-actions">
        <Link className='helo btns sm' style={{color:"white"}} to={`/posts/${post._id}`}>View</Link>
        <Link className='helo btns primarys' style={{color:"white"}} to={`/posts/${post._id}/edit`}>Edit</Link>
        <DeletePost postId={post._id} />
      </div>
    </article>
  })
}
        </div>: <h2 style={{marginTop:"200px"}} className='centers'>You have no posts Yet</h2>
      }
    </section>
  )
}

export default Dashboard