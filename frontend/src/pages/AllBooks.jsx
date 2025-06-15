import React from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import {useState,useEffect} from "react"
import axios from "axios"

const AllBooks = () => {
   const [Data,setData]= useState();
  useEffect(()=>{
      const fetch = async ()=>{
       const response= await axios.get("https://readio-wrte.onrender.com/api/v1/get-all-books");
      setData(response.data.data)
      }
      fetch();
  },[])
  return (
    <div className='bg-zinc-900 px-4 md:px-12 h-auto py-8'>
      <h4 className='text-3xl text-yellow-100'>ALL BOOKS</h4>
        <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 '>
          {!Data && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
          }
          {Data && Data.map((items,i)=> <div key={i}><BookCard data={items}/>{" "}
            </div>)}
        </div>
    </div>
    
  )
}

export default AllBooks