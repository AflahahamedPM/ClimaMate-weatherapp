import React from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { SERVER_LINK } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Weather = () => {
  const location = useLocation();
  const weatherData = location.state?.weatherData;

  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  const navigate = useNavigate();

  const handleFavourite = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    !token && navigate("/login");

    const response = await fetch(`${SERVER_LINK}/favourites`, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (response.ok && responseData.message === "City added") {
      toast.success("City added to your favourite list", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } else if (responseData.message === "City already exist in your fav list") {
      toast.success("CIty already exist in your favourite list", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleForcast = async () => {
    const response = await fetch(`${SERVER_LINK}/weather/forcast?city=${city}`);
    const forcastResponse = await response.json();
    console.log(forcastResponse.data.city.coord);
    const {lat, lon} = forcastResponse.data.city.coord
    console.log(lat, lon);
    navigate(`/weather/forcast?city=${city}`, {
      state: { forcast: forcastResponse.data.list, lat: lat, lon: lon},
    });
  };
  return (
    <>
      <Navbar />
      <div className="mx-auto my-10 h-auto w-[300px] shadow-xl rounded-lg bg-gradient-to-r from-indigo-300 to-gray-200">
        <div className="flex justify-between items-center p-2">
          <div className="m-2 p-2">
            <h1 className="m-0 py-1 text-lg font-semibold text-normal leading-[1px] tracking-wide">
              {weatherData.data.name}
            </h1>
            <h1 className="m-0 font-light text-sm">
              {weatherData.data.weather[0].description}
            </h1>
          </div>
          <img
            src={`../public/icons/${weatherData.data.weather[0].icon}.png`}
            alt=""
            className="w-32"
          />
        </div>

        <div className=" flex justify-between items-center p-2">
          <h1 className="font-bold text-6xl w-auto tracking-tighter my-[10px] mx-2">
            {Math.round(weatherData.data.main.temp)}°C
          </h1>
          <div className="w-full pl-3 ">
            <div className="flex justify-between">
              <span className="px-2 text-left font-light text-sm text-gray-500">
                Feels like
              </span>
              <span className="font-semibold text-sm text-right">
                {Math.round(weatherData.data.main.feels_like)}°C
              </span>
            </div>

            <div className="flex justify-between">
              <span className="px-2 font-light text-sm text-gray-500">
                Wind
              </span>
              <span className="font-semibold text-sm text-right">
                {Math.round(weatherData.data.wind.speed)} m/s
              </span>
            </div>

            <div className="flex justify-between">
              <span className="px-2 font-light text-sm text-gray-500">
                Humidity
              </span>
              <span className="font-semibold text-sm text-right">
                {Math.round(weatherData.data.main.humidity)} g.m-3
              </span>
            </div>

            <div className="flex justify-between">
              <span className="px-2 font-light text-sm text-gray-500">
                Pressure
              </span>
              <span className="font-semibold text-sm text-right">
                {Math.round(weatherData.data.main.pressure)} hpa
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-3 justify-center gap-6">
        <p className="text-xl">
          Would you like to add this in to your favoruite city?{" "}
          <button
            className=" bg-indigo-700 border-2 px-4 py-1 rounded-lg hover:bg-indigo-500"
            onClick={handleFavourite}
          >
            yes
          </button>
        </p>
        <p className="text-xl">
          Would you like to get the forcast of this city?{" "}
          <button
            className=" bg-indigo-700 border-2 px-4 py-1 rounded-lg hover:bg-indigo-500"
            onClick={handleForcast}
          >
            yes
          </button>
        </p>
      </div>
    </>
  );
};

export default Weather;
