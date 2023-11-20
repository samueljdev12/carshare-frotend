import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
       <div className="alert alert-info text-center mt-5 w-75 mx-auto " role="alert">
         Page Not Found
         <Link>  Go Home</Link>
      </div>
    </div>
  )
}

export default NotFound
