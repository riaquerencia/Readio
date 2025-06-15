import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className=' md:h-[75v] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full mb:12 md:mb-0 lg:w-3/6 flex-column items-center lg:items-start justify-center '><h1 className='text-4xl lg:text-6xl font-semibold text-purple-100 text-center lg:text-left'>
            "Your Digital Library at Your Fingertips."
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-centerlg:text-left'>
           
           Discover, manage, and enjoy books from anywhere with Readio — the smart way to read, borrow, and organize your collection.
        </p>
        <div className='mt-8'>
            <Link to="/all-books" className='text-pink-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</Link>
        </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%]flex items-center justify-center'>
        </div>
    </div>
  )
}

export default Hero