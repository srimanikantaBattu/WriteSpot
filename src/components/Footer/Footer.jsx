import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'
function Footer() {
  return (
    <footer>
      <ul className='footer__categories'>
        <li><Link className='helo' to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link className='helo' to="/posts/categories/Business">Business</Link></li>
        <li><Link className='helo' to="/posts/categories/Education">Education</Link></li>
        <li><Link className='helo' to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link className='helo' to="/posts/categories/Art">Art</Link></li>
        <li><Link className='helo' to="/posts/categories/Economy">Investment</Link></li>
        <li><Link className='helo' to="/posts/categories/Uncategorized">Uncategorized</Link></li>
        <li><Link className='helo' to="/posts/categories/Weather">Weather</Link></li>
        <li><Link className='helo' to="/posts/categories/Cricket">Cricket</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All rights reserved &copy; Copyright, SriManikanta Battu</small>
      </div>
    </footer>
  )
}

export default Footer