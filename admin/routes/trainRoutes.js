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

// Find trains by source and destination
router.post('/find', async (req, res) => {
  const { source, destination } = req.body;
  console.log("Finding trains from city", source, "to city", destination);

  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination required.' });
  }

  try {
    const trains = await trainModel.find({});
    const results = [];

    for (const train of trains) {
      // Convert Map to array for ordered traversal
      const routes = Array.from(train.train_route.values());

      let sourceIndex = -1;
      let destinationIndex = -1;

      // Find indexes of source and destination
      routes.forEach((route, idx) => {
        if ((route.city).toLocaleLowerCase() === source.toLocaleLowerCase() && sourceIndex === -1) {
          sourceIndex = idx;
        }
        if ((route.city).toLocaleLowerCase() === destination.toLocaleLowerCase()) {
          destinationIndex = idx;
        }
      });

      // Ensure both exist and destination comes after source
      if (sourceIndex !== -1 && destinationIndex !== -1 && destinationIndex > sourceIndex) {
        results.push(train);
      }
    }

    console.log("Trains found:", results.length);
    res.json(results);

  } catch (err) {
    console.error('Train search error:', err);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});




module.exports = router;
