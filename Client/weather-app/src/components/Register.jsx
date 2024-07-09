import React, { useState } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import {SERVER_LINK} from "../constants.js"

const Register = () => {  
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  
  const handleRegister = async (e) =>{
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    try {
      const response = await fetch(`${SERVER_LINK}/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name, email, password})
      })
      const responseData = await response.json()
      if (response.ok && responseData.message === "user added succesfully") {
        navigate('/login');
      } else {
        const newErrors = {};
        responseData.errors.forEach(error => {
          newErrors[error.path] = error.msg;
        });
       setErrors(newErrors)
      }
    } catch (err) {
      navigate("/register")
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl  ring-1 ring-indigo lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
          Register
        </h1>
        <form onSubmit={handleRegister} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-grey-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Signup
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;