import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel } from "../models/Admin.js";
import { DriverModel } from "../models/Driver.js";
import mongoose from "mongoose";
import { VehicleModel } from "../models/Vehicle.js";

async function registerAdmin(req, res) {
  const { username, phone, email, password } = req.body;

  if (!username || !phone || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required credentials!" });
  }

  const userEmail = await AdminModel.findOne({ email });
  if (userEmail) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  if (password < 6) {
    return res.json({ message: "Password must be atleast 6 charaters long !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new AdminModel({
    username,
    phone,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ message: "User registered succesfully !" });
}

async function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  const user = await AdminModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "username or password is incorrect!" });
  }

  const token = jwt.sign(
    { id: user._id, role: "admin", name: user.username },
    "secret"
  );
  res.json({ token, userID: user._id });
}

async function getUserInfo(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    const users = await AdminModel.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting users" });
  }
}

async function deleteDriver(req, res) {
  try {
    const driverId = req.params.driverId;

    const castDriverId = new mongoose.Types.ObjectId(driverId);

    const driver = await DriverModel.findById(castDriverId);

    if (!driver) {
      return res.status(400).json({ message: "DriverID not found" });
    }

    await DriverModel.findByIdAndDelete(castDriverId);

    return res.status(200).json({ message: "Driver deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting driver!" });
  }
}

async function getDriversUnderAdmin(req, res) {
  const adminId = req.user.id;
  try {
    const drivers = await DriverModel.find({ userOwner: adminId });
    if (!drivers || drivers.length === 0)
      return res
        .status(404)
        .json({ message: "No drivers found for this admin" });
    return res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving drivers" });
  }
}

async function addVehicle(req, res) {
  const { vehicleId, longitude, latitude, plateNumber, color, year, model } =
    req.body;

  if (
    !vehicleId ||
    !longitude ||
    !latitude ||
    !plateNumber ||
    !color ||
    !year ||
    !model
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required vehicle details!" });
  }

  try {
    const newVehicle = new VehicleModel({
      vehicleId,
      longitude,
      latitude,
      plateNumber,
      color,
      year,
      model,
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle created successfully!" });
  } catch (error) {
    console.error("Error creating vehicle:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error creating vehicle", error: error.message });
  }
}

async function getAllVehicles(req, res) {
  try {
    const vehicles = await VehicleModel.find();

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found" });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ message: "Error fetching vehicles", error: error.message });
  }
}

async function updateVehicle(req, res) {
  const { vehicleId, plateNumber, longitude, latitude, color, year, model } =
    req.body;

  if (
    !vehicleId ||
    !plateNumber ||
    !longitude ||
    !latitude ||
    !color ||
    !year ||
    !model
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required vehicle details" });
  }

  try {
    const updatedVehicle = await VehicleModel.findOneAndUpdate(
      { vehicleId },
      { plateNumber, longitude, latitude, color, year, model },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found!" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully!",
      vehicle: updatedVehicle,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating vehicle!" });
  }
}
export {
  registerAdmin,
  loginAdmin,
  getUserInfo,
  deleteDriver,
  getDriversUnderAdmin,
  addVehicle,
  getAllVehicles,
  updateVehicle,
};
