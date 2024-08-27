import express from "express";
import {
  getUserInfo,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlwares/jwtMiddleware.js";

const router = express.Router();
export { router as userRouter };

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", verifyToken, getUserInfo);
