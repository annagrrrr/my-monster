const express = require('express');
const router = express.Router();
const Monster = require('../models/Monster');

router.post('/opponent', async (req, res) => {
  const { powerLevel } = req.body;

  try {
    const opponents = await Monster.find({
      powerLevel: { $gte: powerLevel - 5, $lte: powerLevel + 5 },
    });

    if (opponents.length === 0) {
      return res.status(404).json({ message: 'No opponent found in range' });
    }

    const randomIndex = Math.floor(Math.random() * opponents.length);
    res.json(opponents[randomIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
