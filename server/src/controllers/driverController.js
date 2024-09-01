import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DriverModel } from "../models/Driver.js";

async function registerDriver(req, res) {
  const {
    username,
    phone,
    password,
    birthdate,
    blood,
    license,
    experience,
    imageUrl,
    bio,
    userOwner,
    busID,
    routeID,
    from,
    to,
    time,
  } = req.body;

  if (
    !username ||
    !phone ||
    !password ||
    !imageUrl ||
    !busID ||
    !routeID ||
    !from ||
    !to ||
    !time
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all the required details!" });
  }

  try {
    const existingDriver = await DriverModel.findOne({ phone });
    if (existingDriver) {
      return res
        .status(400)
        .json({ message: "Driver with this phone number already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new DriverModel({
      username,
      phone,
      password: hashedPassword,
      birthdate,
      blood,
      license,
      experience,
      imageUrl,
      bio,
      userOwner,
      busID,
      routeID,
      from,
      to,
      time,
    });
    await newDriver.save();
    res.status(201).json({ message: "Driver Registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error resgistering driver" });
  }
}

async function loginDriver(req, res) {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both phone and password" });
  }

  try {
    const driver = await DriverModel.findOne({ phone });
    if (!driver) {
      return res.status(400).json({ message: "Driver doesn't exist! " });
    }
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect phone number or password !" });
    }

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, driverID: driver._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in Driver" });
  }
}

async function updateDriverRoute(req, res) {
  const { driverID, from, to, routeID, busID } = req.body;

  if (!driverID || !from || !to || !routeID || !busID) {
    return res.status(400).json({ message: "Please provide all requirements" });
  }

  try {
    const updatedDriver = await DriverModel.findByIdAndUpdate(
      driverID,
      { from, to, routeID, busID },
      { new: true, runValidators: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found!" });
    }

    res.status(200).json({ message: "Driver route updated successfully !" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updatingg driver route !" });
  }
}

export { registerDriver, loginDriver, updateDriverRoute };
