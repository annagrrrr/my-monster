const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/monsterController');
const Monster = require('../models/Monster');

// Маршрут для создания нового монстра
router.post('/', async (req, res) => {
  try {
    const monster = new Monster(req.body); // Создаем новый объект Monster с данными из запроса
    const savedMonster = await monster.save(); // Сохраняем монстра в базе данных
    res.status(201).json(savedMonster); // Возвращаем сохраненного монстра с статусом 201
  } catch (error) {
    console.error('Ошибка при создании монстра:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании монстра' });
  }
});


router.get('/', monsterController.getMonsters);
router.get('/:id', monsterController.getMonster);
router.post('/', monsterController.createMonster);
router.put('/:id', monsterController.updateMonster);
router.delete('/:id', monsterController.deleteMonster);
router.patch('/:id', monsterController.markMonsterAsAcquired);

module.exports = router;
