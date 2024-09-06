import express from "express";
import {
  deleteDriver,
  getUserInfo,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlwares/jwtMiddleware.js";
import { updateDriverRoute } from "../controllers/driverController.js";

const router = express.Router();
export { router as userRouter };

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", verifyToken, getUserInfo);
router.patch("/updatedriver", verifyToken, updateDriverRoute);
router.delete("/deletedriver/:driverId", deleteDriver);
