// controllers/trainController.js
const Train = require('../models/train');

// Get all trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new train
exports.addTrain = async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    await newTrain.save();
    res.status(201).json(newTrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a train
exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.status(200).json(train);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a train
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.status(200).json({ message: 'Train deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
