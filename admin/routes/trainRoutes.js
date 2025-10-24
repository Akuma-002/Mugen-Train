const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const trainModel = require('../models/train');
const {
  addTrain,
  updateTrain,
  deleteTrain,
} = require('../controllers/trainController');

// Add a new train
router.post('/add', auth, addTrain);

// Update train details
router.put('/update/:id', auth, updateTrain);

// Delete a train
router.delete('/delete/:id', auth, deleteTrain);




// Get all trains
router.post('/all',(req, res) => {
  const {from, to} = req.body;
  console.log("From:", from, "To:", to);
  if(from && to){
    return trainModel.find({from: from, to: to}).then((trains) => {
      res.status(200).json(trains);
      console.log("Trains found:", trains.length);
    }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  } else {
    console.log("No date filter applied");
  } 
});

module.exports = router;
