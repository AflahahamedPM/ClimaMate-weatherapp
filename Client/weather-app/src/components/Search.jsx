import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_LINK } from '../constants.js'
import Weather from './Weather.jsx'
const Search = () => {
    const [searchText, setSearchText] = useState(null)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleOnClick = async() =>{
        const response = await fetch(`${SERVER_LINK}/weather/current?city=${searchText}`)

        const responseData = await response.json()

        if(response.ok && responseData.message === "current weather got succesfully"){
            navigate(`/weather/current?city=${searchText}`,{state:{weatherData:responseData}})
        }else if(!response.ok && responseData.message === "city not found"){
            const newError = {}
            newError.city = responseData.message
            setError(newError)
        }
    }
  return (
    <>
   
    <div className='flex w-5/12 justify-center items-center'>
        <input type="text" className='w-full  rounded-xl p-2 border focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40'placeholder='search for city...' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} />
        <button className=" mx-4 px-8 py-2 rounded-xl tracking-wide text-white transition-colors duration-200 transform bg-indigo-700  hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"onClick={handleOnClick}>Search</button>
    </div>
    {error && <p className="text-red-500 text-xl ml-[450px]">{error.city}</p>}
    </>
  )
}

export default Search