import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Weather from './components/Weather.jsx'
import {ToastContainer} from 'react-toastify'
import FavCities from './components/FavCities.jsx'
import WeatherForcast from './components/WeatherForcast.jsx'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"/weather/current?",
    element: <Weather />
  },
  {
    path:"/favourites",
    element:<FavCities />
  },
  {
    path:"/weather/forcast?",
    element:<WeatherForcast />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
    <ToastContainer />
  </React.StrictMode>,
)
