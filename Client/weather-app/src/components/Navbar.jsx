import React, { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { SERVER_LINK } from "../constants";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/")
    } else {
      navigate("/login");
    }
  };

  const handleFavCities = async() => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    if(!token) {
        navigate("/login") 
    } else{
        const response = await fetch(`${SERVER_LINK}/favourites`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                token:token
            }
        })
        const responseData = await response.json()
        
        if(responseData.message === "succesfull"){
            navigate("/favourites",{state:{favCities:responseData.favCities}})
        }else{
            toast.success("No city is added in to your favorite list",{
                position:"top-right",
                autoClose:3000,
                theme:"colored"
            })
        }
    }
  }
  return (
    <header className="w-full flex p-4">
      <Link to="/" className="text-3xl mx-[530px] items-center text-indigo-700 font-mono tracking-wider">
        ClimaMate
      </Link>
      <button
        className="mr-20 border px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-500"
        onClick={handleAuthAction}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      <button className="mr-20 border px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-500" onClick={handleFavCities}>
        favCities
      </button>
    </header>
  );
};

export default Navbar;
