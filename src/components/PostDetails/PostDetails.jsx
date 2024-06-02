import React , {useContext,useState,useEffect} from "react";
import PostAuthor from "../PostAuthor/PostAuthor";
import {useForm} from 'react-hook-form'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {UserContext} from '../../contexts/userContext'
import Loader from '../Loader';
import DeletePost from '../Deletepost/Deletepost';
import Comments from '../Comments/Comments'
function PostDetails() {

  let {
    register,handleSubmit,formState:{errors}
  } = useForm();
  const {id} = useParams();
  const [post,setPost] = useState(null);
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [avatar,setAvatar] = useState('');
const {currentUser} = useContext(UserContext)
const token = currentUser?.token;
useEffect(()=>{
  const getPost = async()=>{
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
      setPost(response?.data);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }
  getPost();
},[])
useEffect(()=>{
  const getAuthor = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`)
      setAvatar(response?.data)
    } catch (error) {
      
      console.log(error)
    }
  }
  getAuthor();
},[])

const addingComment = async (formData)=>{
  const data = {
    commentedUser: currentUser.name,
    comment:formData.comment,
    postID:id,
    userID:avatar.avatar
  }
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/comment`,data,{withCredentials:true , headers:{Authorization:`Bearer ${token}`}});
   console.log(response.status)
    if(response.status==200)
  console.log("Comment is Added");
  } catch (error) {
   
    setError(error)
  }
}

if(isLoading){
  return <Loader />
}

  return (
    <div className="">
    <section className="post-detail">
      
      {error && <p className="error">{error}</p>}
     {post && <div className="containers post-detail__container">
        <div className="post-detail__header">
          <PostAuthor createdAt={post.createdAt} authorID={post.creator}/>
          {currentUser?.id== post?.creator &&
          <div className="post-detail__buttons">
            <Link style={{color:"white"}} className="helo btns sm primarys" to={`/posts/${post?._id}/edit`}>
              Edit
            </Link>
            <DeletePost postId={id}></DeletePost>
          </div>
}
        </div>
          
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img className="seperate" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html:post.description}}></p>
      </div>}
     
    </section>
    { currentUser &&
    <div className="containers">
        <Comments id={id}></Comments>
        {currentUser?.id!= post?.creator &&
        <form className="comment mt-2" onSubmit={handleSubmit(addingComment)}>
      <input className="" required placeholder='Comment' type="text" {...register("comment", {
                required: true
              })} id="comment" />
      <button style={{color:"white" , marginTop:"0.8rem"}} type="submit" className="btns primarys">
            Add Comment
          </button>
          </form>
        }
      </div>
}
    </div>
      
  );
}

export default PostDetails;
