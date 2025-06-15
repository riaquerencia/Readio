import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submit = async () => {
    try {
      const { url, title, author, price, desc, language } = Data;
      if (!url || !title || !author || !price || !desc || !language) {
        alert("All fields are required");
        return;
      }

      const res = await axios.put(
        "https://readio-wrte.onrender.com/api/v1/update-book",
        Data,
        { headers }
      );

      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
      });

      alert(res.data.message);
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://readio-wrte.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(res.data.data);
      } catch (err) {
        alert("Failed to fetch book data");
      }
    };

    fetch();
  }, [id]);

  return (
    <div className="h-[100%] p-0 md:p-4 bg-zinc-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>

      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="url" className="text-zinc-400">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400">Title of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor="author" className='text-zinc-400'>Author of the book</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Author of book'
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        <div className='mt-4 flex gap-4'>
          <div className='w-3/6'>
            <label htmlFor="language" className='text-zinc-400'>Language</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Language of book'
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className='w-3/6'>
            <label htmlFor="price" className='text-zinc-400'>Price</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Price of book'
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div className='mt-4'>
          <label htmlFor="desc" className='text-zinc-400'>Description of the book</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Description of book'
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
