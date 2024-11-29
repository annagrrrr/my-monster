const Monster = require('../models/Monster');
exports.markMonsterAsAcquired = async (req, res) => {
  const { id } = req.params;
  const { acquired } = req.body;

  try {
    const updatedMonster = await Monster.findByIdAndUpdate(
      id,
      { acquired },
      { new: true }
    );

    if (!updatedMonster) {
      return res.status(404).json({ message: "Монстр не найден" });
    }

    res.json(updatedMonster);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении монстра", error });
  }
};

exports.getMonsters = async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monsters' });
  }
};


exports.getMonster = async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id);
    if (!monster) return res.status(404).json({ message: 'Monster not found' });
    res.status(200).json(monster);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monster' });
  }
};

exports.createMonster = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const newMonster = new Monster({
      name: req.body.name,
      description: req.body.description,
      powerLevel: req.body.powerLevel,
      rarity: req.body.rarity,
      abilities: req.body.abilities,
    });

    const savedMonster = await newMonster.save();
    console.log('Monster created successfully:', savedMonster);
    res.status(201).json(savedMonster);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Error creating monster', error: error.message });
  }
};


exports.updateMonster = async (req, res) => {
  try {
    const { name, description, powerLevel, rarity, abilities } = req.body;
    const updatedMonster = await Monster.findByIdAndUpdate(
      req.params.id,
      { name, description, powerLevel, rarity, abilities, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedMonster) return res.status(404).json({ message: 'Monster not found' });
    res.status(200).json(updatedMonster);
  } catch (error) {
    res.status(400).json({ message: 'Error updating monster' });
  }
};


exports.deleteMonster = async (req, res) => {
  try {
    const deletedMonster = await Monster.findByIdAndDelete(req.params.id);
    if (!deletedMonster) return res.status(404).json({ message: 'Monster not found' });
    res.status(200).json({ message: 'Monster deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting monster' });
  }
};
