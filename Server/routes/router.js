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

router
.route("/register")
.post(signupValidator, validateRequest(userSignup));

router
.route("/login")
.post(loginValidator, validateRequest(userLogin))

router
.route("/weather/current")
.get(currentWeather)

router
.route("/weather/forcast")
.get(forcast)

router
.route("/favourites")
.post(verifyToken, addCity)
.get(verifyToken, getFavCities)

export default router;
