import React, { useEffect, useState } from 'react';
import { getMonsters, deleteMonster } from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';

const MonsterList = () => {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [filter, setFilter] = useState({ name: '', rarity: '', acquired: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const data = await getMonsters();
        const sortedMonsters = data.sort((a, b) => b.powerLevel - a.powerLevel);
        setMonsters(sortedMonsters);
        setFilteredMonsters(sortedMonsters);
      } catch (err) {
        setError('Ошибка загрузки монстров');
        console.error('Error fetching monsters:', err);
      }
    };

    fetchMonsters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMonster(id);
      setMonsters(monsters.filter((monster) => monster._id !== id));
      setFilteredMonsters(filteredMonsters.filter((monster) => monster._id !== id));
    } catch (err) {
      console.error('Ошибка удаления монстра:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filtered = monsters.filter((monster) => {
      const matchesName = monster.name.toLowerCase().includes(value.toLowerCase());
      const matchesRarity = name === 'rarity' ? monster.rarity === value || value === '' : true;
      const matchesAcquired =
        name === 'acquired'
          ? String(monster.acquired) === value || value === ''
          : true;

      return matchesName && matchesRarity && matchesAcquired;
    });

    setFilteredMonsters(filtered);
  };

  const getBackgroundColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#1d4b74';
      case 'rare':
        return '#3f734d';
      case 'epic':
        return '#703f73';
      case 'legendary':
        return '#b59a48';
      default:
        return '#1d4b74';
    }
  };

  return (
    <div>
      <h2>Список монстров</h2>
      {error && <p>{error}</p>}
      <div className="filter-form">
        <input
          type="text"
          name="name"
          placeholder="Поиск по имени"
          value={filter.name}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Редкость</th>
            <th>Уровень силы</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredMonsters.map((monster) => (
            <tr
              key={monster._id}
              className="monster-row"
              style={{ backgroundColor: getBackgroundColor(monster.rarity) }}
            >
              <td>{monster.name}</td>
              <td>{monster.description}</td>
              <td>{monster.rarity}</td>
              <td>{monster.powerLevel}</td>
              <td>
                <Link to={`/edit/${monster._id}`} className="edit-button">
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(monster._id)}
                  className="delete-button"
                >
                  Удалить
                </button>
                {monster.acquired && (
                  <Link to={`/battle/${monster._id}`} className="fight-button">
                    Битва
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonsterList;
