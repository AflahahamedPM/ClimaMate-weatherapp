import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FORCAST_API, WEATHER_API, WEATHER_API_KEY } from "../weatherApi.js";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists)
      return res.status(201).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const addedUser = await prisma.user.create({ data: newUser });

    return res
      .status(200)
      .json({ message: "user added succesfully", user: addedUser });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const checkUser = await prisma.user.findUnique({ where: { email } });

    if (!checkUser) return res.status(401).json({ message: "Email not found" });

    const comparePassword = await bcrypt.compare(password, checkUser.password);
    console.log(checkUser);
    const accessToken = jwt.sign(
      { userId: checkUser.id },
      process.env.JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    if (checkUser && comparePassword) {
      return res
        .status(200)
        .json({ message: "Succesfully logged in", token: accessToken });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

const fetchWeatherData = async (city) => {
  const data = await fetch(
    `${WEATHER_API}q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const jsonData = await data.json();
  return jsonData;
};

export const currentWeather = async (req, res) => {
  try {
    const city = req.query.city;
    const getWeather = await fetchWeatherData(city);
    if (getWeather.message == "city not found")
      return res.status(400).json({ message: "city not found" });
    return res
      .status(200)
      .json({ message: "current weather got succesfully", data: getWeather });
  } catch (err) {}
};

const fetchForcast = async(city) => {
    const data = await fetch(`${FORCAST_API}q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    const jsonData = await data.json()
    return jsonData
}

export const forcast = async(req,res) => {
    const {city} = req.query
    const getForcast = await fetchForcast(city)
    return res.status(200).json({message:"forcast got succesfully",data:getForcast})
}

export const addCity = async (req, res) => {
  const { city } = req.body;
  const currentUser = await prisma.user.findFirst({
    where: { id: req.userId },
  });

  if (currentUser.favCities.includes(city)) {
    res.status(400).json({ message: "City already exist in your fav list" });
  } else {
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        favCities: {
          push: city,
        },
      },
    });
    res.status(200).json({ message: "City added" });
  }
};

export const getFavCities = async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.userId } });
  if (user.favCities.length > 0) {
    const favCities = user.favCities;
    res.status(200).json({ message: "succesfull", favCities: favCities });
  } else {
    res.status(400).json({ message: "No cities in your favourite list" });
  }
};
