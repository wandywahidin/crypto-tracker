import React from 'react'
import { Link } from 'react-router-dom'

const News = () => {
  return (
    <div className="w-full h-screen text-white text-5xl font-bold items-center text-center mt-96">
      <h1>Soon Features</h1>
      <div className="text-center mt-4">
        <Link to="/" className="border border-white text-xl p-2 rounded hover:bg-white hover:text-black">
            Back To Home
        </Link>
      </div>
    </div>
  )
}

export default News