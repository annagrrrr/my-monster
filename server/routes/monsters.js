const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/monsterController');
const Monster = require('../models/Monster');
router.get('/', monsterController.getMonsters);
router.get('/:id', monsterController.getMonster);
router.post('/', monsterController.createMonster);
router.put('/:id', monsterController.updateMonster);
router.delete('/:id', monsterController.deleteMonster);
router.patch('/:id', monsterController.markMonsterAsAcquired);

module.exports = router;
