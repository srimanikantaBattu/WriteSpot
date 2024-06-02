import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Authors.css'
import Loader from '../Loader'
import axios from 'axios'
function Authors() {
 
  const [authors,setAuthors]=useState([])
  const [isLoading,setIsLoading]=useState(false);



  useEffect(()=>{
    const getAuthors = async ()=>{
      setIsLoading(true);
      try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
      setAuthors(response.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getAuthors();
  },[])

  if(isLoading)
    return <Loader />

  return (
    
    <section style={{marginTop:"150px"}} className="authors">
      {authors.length>0?<div className="containers-1 authors__container">
        {
          authors.map(({_id:id,avatar,name,posts})=>{
            return <Link className='helo author' key={id} to={`/posts/users/${id}`}>
              <div className="author__avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
              </div>
              <div className="author__info">
                <h4 style={{fontSize:"1rem"}} className='desc'>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div>: <h2 className='d-flex justify-content-center align-items-center' style={{marginTop:"18rem"}} >No Users / Authors Found</h2>
}
    </section>
  )
}

export default Authors