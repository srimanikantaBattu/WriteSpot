import React from 'react'
import {Link} from 'react-router-dom'
import './PostItem.css'
import PostAuthor from '../PostAuthor/PostAuthor'
function PostItem({postID,thumbnail,category,title,description,authorID,createdAt}) {
  const shortDescription = description.length > 145 ? description.substr(0,145)+'....':description;
  const postTitle = title.length > 30 ? title.substr(0,30)+'....':title;
    return (
   <article className="post">
    <div className="post__thumbnail">
    <Link className='helo' to={`/posts/${postID}`}>
        <img className='seperate' src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
    </Link>
    </div>
    <div className="post__content">
        <Link className='helo' to={`/posts/${postID}`}>
            <h3 className='titles'>{postTitle}</h3>
        </Link>
        <p className='desc' dangerouslySetInnerHTML={{__html:shortDescription}}></p>
        <div className="post__footer">
            <PostAuthor authorID={authorID} createdAt={createdAt}/>
            <Link className='helo btnsc category' to={`/posts/categories/${category}`}>{category}</Link>
        </div>
    </div>
   </article> 
)
}

export default PostItem