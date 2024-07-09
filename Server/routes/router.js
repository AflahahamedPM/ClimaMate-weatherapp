import express from "express";
import { userSignup, userLogin, currentWeather, forcast, addCity, getFavCities} from "../controller/userHomeController.js";
import { signupValidator, loginValidator } from "../middleware/validation.js";
import { validationResult } from "express-validator";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

const validateRequest = (handler) => async (req, res) => {
  //This validateRequest function will check whether there is validation errors during both login and signup
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await handler(req, res);
};

router //this route is used to register the user, the logic behind this is if there is a user with unique email will be added  
.route("/register")
.post(signupValidator, validateRequest(userSignup)); 

router // this route will if the email and password of the user inputted is present in the DB if exist the user is provided with a JWT token 
.route("/login")
.post(loginValidator, validateRequest(userLogin))

router // This route will gives the current weather data 
.route("/weather/current")
.get(currentWeather)

router // This route will gives the weather forcast for upcoming seven days
.route("/weather/forcast")
.get(forcast)

router
.route("/favourites")
.post(verifyToken, addCity)  // This route will perform adding the city in the favourite list if not present already in the db
.get(verifyToken, getFavCities) // This route will shows if any favourite city is present on user specific

export default router;
