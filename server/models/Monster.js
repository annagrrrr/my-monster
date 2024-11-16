const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  powerLevel: { type: Number, required: true, min: 1, max: 100 },
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], required: true },
  health: { type: Number, required: true},
  minAttack: { type: Number, required: true},
  maxAttack: { type: Number, required: true},
  acquired: { type: Boolean, required: true},
});

module.exports = mongoose.model('Monster', monsterSchema);
