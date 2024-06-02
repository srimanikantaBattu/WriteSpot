import React from 'react'
import { useState,useContext,useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {UserContext} from '../../contexts/userContext'
import ReactQuill from 'react-quill'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css'
function EditPost() {
  const [title,setTitle] = useState('')
  const [category,setCategory]=useState('Uncategorized')
  const [description,setDescription] = useState('');
  const [thumbnail,setThumbnail] = useState('');
  const [error,setError] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(()=>{
    if(!token)
      navigate('/login')
  },[])

  const formats =[
    'header',
    'bold', 'italic' ,'underline' ,'strike','blockquote','list','bullet','indent','link','image'
  ]
  const modules ={
    toolbar:[
      [{'header':[1,23,4,5,6,false]}],
      ['bold', 'italic' ,'underline' ,'strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean']
    ]
  }
  const POST_Categories =["Agriculture" , "Education" , "Business" , "Entertainement" , "Art" , "Economy" , "Weather" , "Cricket" , "Uncategorized"]
  
  
  
  useEffect(()=>{
    const getPost = async()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
       setTitle(response.data.title);
       setDescription(response.data.description);

      } catch (error) {
        console.log(error)
      }
    }
    getPost();
  },[])
  
  
  
  const editPost = async (e)=>{
    e.preventDefault();

    const postData = new FormData();
    postData.set('title',title);
    postData.set('category',category);
    postData.set('description',description);
    postData.set('thumbnail',thumbnail);
try {
  const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,postData,{withCredentials:true , headers:{Authorization:`Bearer ${token}`}})
  if(response.status===200){
    return navigate('/');
  }
} catch (error) {
  setError(error.response?.data?.message || "An Error Occured");
}

  }

  
  
  
  
  
  return (
    <div className="create-post">
      <div className="containers">
        <h2>Edit Post</h2>
        {error &&
        <p className="form__error-message">
          {error}
        </p>
}
        <form onSubmit={editPost} className="forms create-post__form">
          <input type="text" name="" placeholder='Title' autoFocus onChange={e=>setTitle(e.target.value)} value={title} id="" /> 
          <select name="category" value={category} onChange={e=>setCategory(e.target.value)} id="">
            {
              POST_Categories.map(cat=> <option key={cat}>{cat}</option>)
            }
            
            
          </select>
          <ReactQuill className='q1-editor' modules={modules} formats={formats} value={description} onChange={setDescription}></ReactQuill>
          <input type="file" accept="png,jpg,jpeg" onChange={e=>setThumbnail(e.target.files[0])} name="" id="" />
         <button style={{color:"white"}} type="submit" className='btns primarys'>Update</button>
        </form>

      </div>
    </div>
  )
}

export default EditPost