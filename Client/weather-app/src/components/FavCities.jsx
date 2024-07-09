import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_LINK } from "../constants";
import Navbar from "./Navbar";

const FavCities = () => {
  const location = useLocation();
  const favCities = location.state?.favCities;

  const navigate = useNavigate();

  const handleOnClick = async (e, city) => {
    const response = await fetch(`${SERVER_LINK}/weather/current?city=${city}`);
    const responseData = await response.json();
    if (
      response.ok &&
      responseData.message === "current weather got succesfully"
    ) {
      navigate(`/weather/current?city=${city}`, {
        state: { weatherData: responseData },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 flex justify-center">
        <div className="grid grid-rows-3 gap-12 w-5/12">
          {favCities.map((city, index) => (
            <div
              key={index}
              className="border-2 bg-gradient-to-r from-indigo-400 to-gray-200 rounded-xl p-4 cursor-pointer flex justify-center items-center text-2xl"
              onClick={(e) => handleOnClick(e, city)}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavCities;
