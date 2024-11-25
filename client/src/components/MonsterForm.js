import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MonsterForm() {
  const navigate = useNavigate();
  const [monsterData, setMonsterData] = useState({
    name: '',
    description: '',
    powerLevel: '',
    rarity: 'common',
    health: 100,
    minAttack: 1,
    maxAttack: 10,
    acquired: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMonsterData((prev) => ({
      ...prev,
      [name]: name === 'acquired' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/monsters', monsterData);
      console.log("Monster created successfully:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Ошибка при создании монстра:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="monster-form">
      <input
        type="text"
        name="name"
        value={monsterData.name}
        onChange={handleChange}
        placeholder="Имя"
        required
        className="form-input"
      />
      <input
        type="text"
        name="description"
        value={monsterData.description}
        onChange={handleChange}
        placeholder="Описание"
        required
        className="form-input"
      />
      <input
        type="number"
        name="powerLevel"
        value={monsterData.powerLevel}
        onChange={handleChange}
        placeholder="Уровень силы"
        required
        className="form-input"
      />
      <label>
        Редкость:
        <select
          name="rarity"
          value={monsterData.rarity}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="common">common</option>
          <option value="rare">rare</option>
          <option value="epic">epic</option>
          <option value="legendary">legendary</option>
        </select>
      </label>
      <input
        type="number"
        name="health"
        value={monsterData.health}
        onChange={handleChange}
        placeholder="Здоровье"
        required
        className="form-input"
      />
      <input
        type="number"
        name="minAttack"
        value={monsterData.minAttack}
        onChange={handleChange}
        placeholder="Минимальный урон"
        required
        className="form-input"
      />
      <input
        type="number"
        name="maxAttack"
        value={monsterData.maxAttack}
        onChange={handleChange}
        placeholder="Максимальный урон"
        required
        className="form-input"
      />
      <label>
        Получен:
        <select
          name="acquired"
          value={monsterData.acquired}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="false">Не получен</option>
          <option value="true">Получен</option>
        </select>
      </label>
      <button type="submit" className="form-button">Создать монстра</button>
    </form>
  );
}

export default MonsterForm;
