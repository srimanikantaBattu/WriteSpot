import React from 'react'
import { Audio } from 'react-loader-spinner'
function Loader() {
  return (
    <div className='loader'>
        <div className="loader__image aud">
        <Audio
        className=""
  height="80"
  width="80"
  radius="9"
  color="var(--loader-color)"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
        </div>
    </div>
  )
}

export default Loader