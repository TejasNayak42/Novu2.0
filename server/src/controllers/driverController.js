import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DriverModel } from "../models/Driver.js";
import { VehicleModel } from "../models/Vehicle.js";

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
    vehicleID,
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
    !vehicleID ||
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
    // Check if the vehicleID matches an existing vehicleId
    const vehicle = await VehicleModel.findOne({ vehicleId: vehicleID });
    if (!vehicle) {
      return res
        .status(400)
        .json({ message: "Invalid vehicleID. No matching vehicle found!" });
    }

    // Check if a driver with the same phone number already exists
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
      vehicleID,
      routeID,
      from,
      to,
      time,
    });

    await newDriver.save();
    res.status(201).json({ message: "Driver registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error registering driver" });
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

    const token = jwt.sign(
      {
        id: driver._id,
        role: "driver",
        name: driver.username,
        img: driver.imageUrl,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token, driverID: driver._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in driver" });
  }
}

async function updateDriverRoute(req, res) {
  const { driverID, from, to, routeID, vehicleID } = req.body;

  if (!driverID || !from || !to || !routeID || !vehicleID) {
    return res.status(400).json({ message: "Please provide all requirements" });
  }

  try {
    const updatedDriver = await DriverModel.findByIdAndUpdate(
      driverID,
      { from, to, routeID, vehicleID },
      { new: true, runValidators: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found!" });
    }

    res.status(200).json({ message: "Driver route updated successfully !" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating driver route !" });
  }
}

async function getDriverData(req, res) {
  try {
    const driverID = req.params.driverId;

    const driver = await DriverModel.findById(driverID);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found!" });
    }

    res.status(200).json({
      username: driver.username,
      phone: driver.phone,
      birthdate: driver.birthdate,
      blood: driver.blood,
      license: driver.license,
      experience: driver.experience,
      imageUrl: driver.imageUrl,
      bio: driver.bio,
      vehicleID: driver.vehicleID,
      routeID: driver.routeID,
      from: driver.from,
      to: driver.to,
      time: driver.time,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving driver data!" });
  }
}

export { registerDriver, loginDriver, updateDriverRoute, getDriverData };
