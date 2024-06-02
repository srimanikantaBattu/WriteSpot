import React, { useState , useEffect } from 'react'
import PostItem from '../PostItem/PostItem'
import axios from 'axios';
import Loader from '../Loader'
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'

function AuthorPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [authorname,setAuthorname] = useState('');
  const {id} = useParams();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
        setPosts(response?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
   fetchPosts();
  },[id])
  
  useEffect(()=>{
    const getUser = async () =>{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`);
      setAuthorname(response.data.name);
    }
    getUser();
  },[])
  
  
  if(isLoading)
    return <Loader />
  
  return (
    <section className="posts">
      { posts.length>0 && <motion.h1
      initial={{x:-1000}}
      animate={{x:[0,900,0]}}
      transition={
        {
          duration:3,
          delay:0.2
        }
      }
      whileHover={{scale:0.9,opacity:0.2}}
      className='d-flex justify-content-center mb-3'
      >
        Posts of Author <h1 className='ms-3' style={{fontFamily:"fantasy"}}> {authorname} </h1>
      </motion.h1>
}
      {posts.length > 0 ? (
        <div className="containers-1 posts__container">
          {posts.map(({_id: id, thumbnail, category, title, description, creator , createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="centers">No Posts</h2>
      )}
    </section>
  );
}
export default AuthorPosts