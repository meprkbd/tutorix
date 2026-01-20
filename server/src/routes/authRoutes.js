import express from "express";
import {
  changePasswordValidation,
  loginValidation,
  registerValidation,
} from "../validators/authValidator.js";
import {
  changePassword,
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { isAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// Public routes
router.route("/register").post(registerValidation, validate, register);
router.route("/login").post(loginValidation, validate, login);

// Protected routes
router.use(isAuth);
router.route("/profile").get(getProfile).put(updateProfile);
router
  .route("/change-password")
  .post(changePasswordValidation, validate, changePassword);

export default router;
