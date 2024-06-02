import React, { useState , useEffect } from 'react'
import PostItem from '../PostItem/PostItem'
import axios from 'axios';
import Loader from '../Loader'
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {category} = useParams();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
   fetchPosts();
  },[category])
  
  
  
  
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
        <h1 className='ms-3 me-3' style={{fontFamily:"fantasy"}}> {category} </h1> Category Posts
      </motion.h1>}
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
        <h2 className="centers" style={{marginTop:"250px"}}>No Posts Found</h2>
      )}
    </section>
  );
}
export default CategoryPosts