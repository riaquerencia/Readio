import React from "react"
import Loader from '../Loader/Loader'
import { useNavigate, useParams } from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios"
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom"

const ViewBookDetails=()=>{
    const {id}= useParams();
    const navigate= useNavigate()
    
    const [Data,setData]= useState();
    useEffect(()=>{
    const fetch = async ()=>{
    const response= await axios.get(`https://readio-wrte.onrender.com/api/v1/get-book-by-id/${id}`);
   
      setData(response.data.data)
      }
      fetch();
  },[id])


  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  }

const handleFavourite = async ()=>{
    const response= await axios.put("https://readio-wrte.onrender.com/api/v1/add-book-to-favourite",{},{headers})
    alert(response.data.message)
  }

const handleCart= async()=>{
  const response = await axios.put("https://readio-wrte.onrender.com/api/v1/add-to-cart",{},{headers})
  alert(response.data.message)
}
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const role= useSelector((state)=>state.auth.role)
  // console.log(isLoggedIn)
  // console.log(role)

const deleteBook = async()=>{
  const res=await axios.delete("https://readio-wrte.onrender.com/api/v1/delete-book",{headers}
  );
  alert(res.data.message)
  navigate("/all-books")
}
    return(
    <>
   {Data && (
  <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
    <div className="w-full lg:w-3/6">
      <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
        <img
          src={Data.url}
          alt="/"
          className="md:h-[50vh] h-[60vh] lg:h-[70vh] rounded object-cover"
        />
    {isLoggedIn === true && role === "user" && (
      <div className="flex flex-col md:flex-row  items-center justify-between lg:justify-start lg:flex-col mt-8 lg:mt-0">
        <button className="bg-white lg:rounded-full rounded text-3xl p-3  text-red-500 md:p-3 flex items-center justify-center "onClick={handleFavourite}>
          <FaHeart /><span className="ms-4 block lg:hidden">Favourites</span>
        </button>
        <button className="text-white lg:rounded-full rounded text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center mt-8 md:mt-0" onClick={handleCart}><FaShoppingCart />
          <span className="ms-4 block lg:hidden">Add to Cart</span>
        </button>
      </div>
    )}

    {isLoggedIn === true && role === "admin" && (
      <div className="flex flex-col md:flex-row  items-center justify-between lg:justify-start lg:flex-col mt-8 lg:mt-0">
        <Link to={`/updateBook/${id}`} className="bg-white lg:rounded-full rounded text-3xl p-3  md:p-3 flex items-center justify-center">
          <FaEdit /><span className="ms-4 block lg:hidden">Edit</span>
        </Link>
        <button className="text-red-500 lg:rounded-full rounded text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center mt-8 md:mt-0" onClick={deleteBook}>
          <MdDeleteOutline /><span className="ms-4 block lg:hidden">Delete Book</span>
        </button>
      </div>
    )}
  </div>
   
 </div>

 
        <div className="p-4 lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">
    {Data.title}
  </h1>
  <p className="text-zinc-400 mt-1">
    by {Data.author}
  </p>
  <p className="text-zinc-500 mt-4 text-xl">
    {Data.desc}
  </p>
  <p className="flex mt-4 items-center justify-start text-zinc-400">
    Language: 
    <span className="ml-3 text-zinc-300 font-medium">
      {Data.language}
    </span>
  </p>
  <p className="mt-4 text-zinc-100 text-3xl font-semibold">
    Price: ₹{Data.price}
  </p>
    </div>
    </div>
    )}
    {!Data && <div className="h-screen bg-zinc-900 flex items-center justify center"> <Loader /></div>}
    
    </>
    )
} 

export default ViewBookDetails;