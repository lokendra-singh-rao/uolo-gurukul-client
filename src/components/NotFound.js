import React from 'react'
import notFound from '../images/notFound.png'

function NotFound() {
  return (
    <div className='not-found flex'>
        <img src={notFound} alt='pageNotFound'/>
        <h1>Page Not Found!</h1>
    </div>
  )
}

export default NotFound