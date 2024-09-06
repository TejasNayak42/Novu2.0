import express from "express";
import {
  deleteDriver,
  getUserInfo,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlwares/jwtMiddleware.js";
import {
  registerDriver,
  updateDriverRoute,
} from "../controllers/driverController.js";

const router = express.Router();
export { router as userRouter };

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", verifyToken, getUserInfo);
router.patch("/update-driver", verifyToken, updateDriverRoute);
router.delete("/delete-driver/:driverId", verifyToken, deleteDriver);
router.post("/add-driver", verifyToken, registerDriver);
