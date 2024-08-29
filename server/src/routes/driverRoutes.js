import express from "express";
import {
  loginDriver,
  registerDriver,
} from "../controllers/driverController.js";

const router = express.Router();
export { router as driverRouter };

router.post("/register", registerDriver);
router.post("/login", loginDriver);
