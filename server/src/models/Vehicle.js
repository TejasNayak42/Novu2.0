import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

export const VehicleModel = mongoose.model("Vehicle", VehicleSchema);
