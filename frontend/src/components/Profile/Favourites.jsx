import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'

const Favourites = () => {
  const[FavouriteBooks,setFavouriteBooks]=useState()

  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
 
  } 

  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("https://readio-wrte.onrender.com/api/v1/get-favourite-books",{headers})
      setFavouriteBooks(response.data.data)
    }
    fetch()
  },[FavouriteBooks])
  return (
    <>
    {FavouriteBooks && FavouriteBooks.length===0 && (
        <div className='text-5xl font-semibold text-zinc-500 flex justify-center items-center h-[100%]'>No Favourite Books</div>
      )}

      <div className='grid grid-cols-4 gap-4'>
      {FavouriteBooks && FavouriteBooks.map((items,i)=>(
        <div key={i}>
          <BookCard data={items} favourite={true}/>
        </div>
      ))}
    </div>
    </>
      
  )
}

export default Favourites