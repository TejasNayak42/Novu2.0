import express from "express";
import {
  addVehicle,
  deleteDriver,
  getDriversUnderAdmin,
  getUserInfo,
  loginAdmin,
  registerAdmin,
  getAllVehicles,
  updateVehicle,
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
router.post("/add-driver", verifyToken, registerDriver);
router.post("/add-vehicle", verifyToken, addVehicle);

router.get("/", verifyToken, getUserInfo);
router.get("/drivers", verifyToken, getDriversUnderAdmin);
router.get("/vehicles", verifyToken, getAllVehicles);

router.patch("/update-vehicle", verifyToken, updateVehicle);

router.patch("/update-driver", verifyToken, updateDriverRoute);

router.delete("/delete-driver/:driverId", verifyToken, deleteDriver);
