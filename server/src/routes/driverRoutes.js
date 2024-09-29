import express from "express";
import {
  getDriverData,
  loginDriver,
  registerDriver,
} from "../controllers/driverController.js";
import { verifyToken } from "../middlwares/jwtMiddleware.js";

const router = express.Router();
export { router as driverRouter };

router.post("/register", registerDriver);
router.post("/login", loginDriver);

router.get("/info/:driverId", verifyToken, getDriverData);
