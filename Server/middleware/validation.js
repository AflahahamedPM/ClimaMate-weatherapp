import { body } from "express-validator";

const signupValidator = [
  body("name")
    .isLength({ min: 4, max: 16 })
    .withMessage("The name should contains 4-20 letters only")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email should not be empty"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters")
    .notEmpty()
    .withMessage("Password cannot be empty")
];

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email should not be empty"),

  body("password", "password should not be empty").notEmpty(),
];

export { signupValidator, loginValidator};
