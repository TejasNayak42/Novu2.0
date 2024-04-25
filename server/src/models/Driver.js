import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    validate: {
      validator: (value) => {
        return /^\d{10}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  birthdate: {
    type: String,
    validate: {
      validator: (value) => {
        // Check if the date is in the format DD-MM-YYYY
        return /^\d{2}-\d{2}-\d{4}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid date format (DD-MM-YYYY)!`,
    },
  },
  blood: { type: String },
  license: { type: String },
  experience: {
    type: Number,
    min: 0,
    max: 50,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^https?:\/\//.test(value);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  bio: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
    required: true,
  },
  busID: { type: String, required: true },
  routeID: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: String, required: true },
});

export const DriverModel = mongoose.model("drivers", DriverSchema);
