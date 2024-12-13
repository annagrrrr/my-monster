import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMonsterById, updateMonster } from '../services/api';

const MonsterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [monster, setMonster] = useState({
    name: '',
    description: '',
    powerLevel: '',
    rarity: 'common',
    health: '',
    minAttack: '',
    maxAttack: '',
    acquired: false,
  });

  useEffect(() => {
    const fetchMonster = async () => {
      try {
        const data = await getMonsterById(id);
        setMonster(data);
      } catch (error) {
        console.error('Error fetching monster:', error);
      }
    };

    fetchMonster();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMonster((prev) => ({
      ...prev,
      [name]: name === 'acquired' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMonster(id, monster);
      navigate('/');
    } catch (error) {
      console.error('Error updating monster:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Редактировать монстра</h2>
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={monster.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Описание:
        <input
          type="text"
          name="description"
          value={monster.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Уровень силы:
        <input
          type="number"
          name="powerLevel"
          value={monster.powerLevel}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Редкость:
        <select
          name="rarity"
          value={monster.rarity}
          onChange={handleChange}
          required
        >
          <option value="common">common</option>
          <option value="rare">rare</option>
          <option value="epic">epic</option>
          <option value="legendary">legendary</option>
        </select>
      </label>

      <label>
        Здоровье:
        <input
          type="number"
          name="health"
          value={monster.health}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Минимальный урон:
        <input
          type="number"
          name="minAttack"
          value={monster.minAttack}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Максимальный урон:
        <input
          type="number"
          name="maxAttack"
          value={monster.maxAttack}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Получен:
        <select
          name="acquired"
          value={monster.acquired}
          onChange={handleChange}
          required
        >
          <option value="false">Не получен</option>
          <option value="true">Получен</option>
        </select>
      </label>

      <button type="submit">Сохранить изменения.</button>
    </form>
  );
};

export default MonsterEdit;
