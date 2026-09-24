import express from "express";
import { register, login, profile } from "../controllers/auth.controllers.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validateFields } from "../middlewares/validate.middleware.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validation.js";

const router = express.Router();

router.post("/register", registerValidation, validateFields, register);
router.post("/login", loginValidation, validateFields, login);
router.get("/profile", checkAuth, profile);

export default router;
