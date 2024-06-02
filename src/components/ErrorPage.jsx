import React from 'react'
import {Link} from 'react-router-dom'
function ErrorPage() {
  return (
    <section className='erorr-page'>
      <div className="centers">
        <Link to='/' className='helo btns primarys'>Go Back Home</Link>
        <h2 className='mt-3'>Page Not Found</h2>
      </div>
    </section>
  )
}

export default ErrorPage