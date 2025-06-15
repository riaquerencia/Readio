import React from 'react'
import { useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import axios from "axios"
import { authActions } from '../Store/auth';
import { useDispatch } from 'react-redux';


const LogIn = () => {
  const [Values,setValues]=useState(
    {username:"",
     
      password:""
     
    })
    
  const dispatch= useDispatch()

  const navigate=useNavigate();


    const change=(e)=>{
      const {name,value}=e.target;
      setValues({...Values,[name]:value})
    }

  const submit = async () => {
    try {
    if (
      Values.username === "" ||
      
      Values.password === "" 
     
    ) {
      alert("All fields are required!");
      return; 
    }

    const response = await axios.post("https://readio-wrte.onrender.com/api/v1/sign-in", Values);

    console.log(response.data.toke)
    
    dispatch(authActions.login())

    localStorage.setItem("id",response.data.id)
    localStorage.setItem("role",response.data.role)
    localStorage.setItem("token",response.data.toke)

    navigate("/profile");

  } catch (error) {
    alert(error.response.data.message)
  }
};
  return (
     <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
          <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
            <p className="text-zinc-200 text-xl">LogIn</p>
    
           
            <div className="mt-4">
              <label htmlFor="username" className="text-zinc-400">
                Username
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="username"
                name="username"
                required
                value={Values.username}
                onChange={change}

              />
            </div>
           
      <div className="mt-4">
      <label htmlFor="password" className="text-zinc-400">
        Password
      </label>
      <input
        type="password"
        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
        placeholder="password"
        name="password"
        required
        value={Values.password}
        onChange={change}
      />
    </div>
    
    
      <div className="mt-4">
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-200" onClick={submit}>LogIn</button>
      </div>
      <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
        Or
      </p>
      <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
        Don't have an account? &nbsp;
        <Link to="/SignUp" className="hover:text-blue-500">
        <u>SignUp</u></Link>
      </p>
         
          </div>
        </div>
  )
}

export default LogIn