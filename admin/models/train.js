const mongoose = require("mongoose");

// Schema for each class (1A, 2A, etc.)
const classSchema = new mongoose.Schema({
  seats_available: { type: Number, required: true },
  fare: { type: Number, required: true }
}, { _id: false });

// Schema for each station in the route
const stationSchema = new mongoose.Schema({
  station_name: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  station_sort_name: { type: String, required: true },
  arrival_day: { type: Number },
  arrival_month: { type: Number },
  arrival_year: { type: Number },
  arrival_time: { type: String },
  departure_day: { type: Number },
  departure_month: { type: Number },
  departure_year: { type: Number },
  departure_time: { type: String },
  halt_time_m: { type: Number },
  distance_from_source: { type: Number }
}, { _id: false });

// Main Train Schema
const trainSchema = new mongoose.Schema({
  train_name: { type: String, required: true },
  train_number: { type: Number, required: true, unique: true },
  departure_station: { type: String, required: true },
  arrival_station: { type: String, required: true },
  departure_time: { type: String, required: true },
  arrival_time: { type: Date, required: true },
  total_time: { type: String, required: true },
  days_of_operation: [{ type: String, required: true }],

  // Nested object for different classes
  classes_available: {
    "1A": { type: classSchema },
    "2A": { type: classSchema },
    "3A": { type: classSchema },
    "SL": { type: classSchema }
  },

  // Object of stations (keyed by station code or short name)
  train_route: {
    type: Map,
    of: stationSchema
  }

}, { timestamps: true });

module.exports = mongoose.model("Train", trainSchema);
