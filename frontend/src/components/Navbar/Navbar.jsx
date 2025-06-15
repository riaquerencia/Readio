import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import {useSelector} from "react-redux"

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

const role= useSelector((state)=>state.auth.role) 

 const isLoggedIn= useSelector((state)=>
    state.auth.isLoggedIn
 );
if(isLoggedIn== true && role==="admin"){
  links.splice(3,1)
}

if(isLoggedIn== true && role==="user"){
  links.splice(4,1)
}

 
 if(isLoggedIn===false){
  links.splice(2,2)
 }

 
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  return (
    <>
      <nav className="bg-zinc-800 text-white px-8 py-4 flex items-center justify-between z-50 relative">
        <div className="text-2xl font-semibold">Readio</div>

       
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn=== false &&(
            <>
            <Link
            to="/SignUp"
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign up
          </Link>
          <Link
            to="/LogIn"
            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Login
          </Link>
            </>
          )
        }
          
        </div>

        {/* Mobile toggle button */}
        <button
          className=" block md:hidden text-white text-2xl hover:text-zinc-400"
          onClick={toggleMobileNav}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileNavVisible && (
        <div className="md:hidden bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMobileNavVisible(false)}
              className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn===false &&(
            <>
            <Link
            to="/SignUp"
            onClick={() => setMobileNavVisible(false)}
            className="mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign up
          </Link>
          <Link
            to="/LogIn"
            onClick={() => setMobileNavVisible(false)}
            className="mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded text-white hover:text-zinc-800 transition-all duration-300 hover:bg-white"
          >
            Login
          </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
