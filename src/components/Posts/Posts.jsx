import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import PostItem from "../PostItem/PostItem";
import axios from 'axios';
import "./Posts.css";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  useEffect(()=>{
    const fetchPosts = async ()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
        setPosts(response?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
   fetchPosts();
  },[])
  
  
  
  
  if(isLoading)
    return <Loader />
  
  return (
    <section className="posts">
      {posts.length > 0 ? 
        <div className="containers-1 posts__container">
          {posts.map(({_id: id, thumbnail, category, title, description, creator , createdAt }) => 
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
          )}
        </div>
       : 
       <div className="">
        <h2  style={{marginTop:"18rem"}} className="d-flex justify-content-center align-items-center">No Posts</h2>
        </div>
      }
    </section>
  );
}

export default Posts;
