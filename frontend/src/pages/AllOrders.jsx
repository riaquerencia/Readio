import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData'; 

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://readio-wrte.onrender.com/api/v1/get-all-orders", { headers });
        const orders = res.data.data;
        orders.splice(orders.length - 1, 1); 
        setAllOrders(orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetch();
  }, []); 

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    try {
      const res = await axios.put(
        `https://readio-wrte.onrender.com/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      alert(res.data.message);
      setOptions(-1);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <>
      {!AllOrders.length ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>

         
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]"><FaUserLarge /></div>
          </div>

         
          {AllOrders.map((items, i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900">
              <div className="w-[3%] text-center">{i + 1}</div>

              <div className="w-[40%] md:w-[22%]">
                <Link to={`/view-book-details/${items.book_id}`} className="hover:text-blue-300">
                  {items.book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                {items.book.desc.slice(0, 50)}...
              </div>

              <div className="w-[17%] md:w-[9%]">
                {items.book.price}
              </div>

              <div className="w-[30%] md:w-[16%] font-semibold">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(i)}
                >
                  {items.status === "Order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    <div className="text-green-500">{items.status}</div>
                  )}
                </button>

                <div className={`${Options === i ? "flex" : "hidden"}`}>
                  <select
                    name="status"
                    className="bg-gray-800 text-white px-2"
                    onChange={handleChange}
                    value={Values.status}
                  >
                    {["Order placed", "Out for delivery", "Delivered", "Cancelled"].map((status, j) => (
                      <option key={j} value={status}>{status}</option>
                    ))}
                  </select>
                  <button className="text-green-500 hover:text-pink-600 mx-2" onClick={() => submitChanges(i)}>
                    <FaCheck />
                  </button>
                </div>
              </div>

              <div className='w-[10%] md:w-[5%]'>
                <button className='text-xl hover:text-orange-500' onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(items.user);
                }}>
                  <FaUserLarge />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
