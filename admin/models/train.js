// models/train.js

const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_number: {
    type: String,
    required: true,
    unique: true
  },
  train_name: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  total_time: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
