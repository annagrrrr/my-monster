// MonsterList.js
import React, { useEffect, useState } from 'react';
import { getMonsters, deleteMonster } from '../services/api';
import { Link } from 'react-router-dom';


const MonsterList = () => {
  const [monsters, setMonsters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const data = await getMonsters();
        const sortedMonsters = data.sort((a, b) => b.powerLevel - a.powerLevel);
        setMonsters(sortedMonsters);
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
    } catch (err) {
      console.error('Ошибка удаления монстра:', err);
    }
  };

  const getBackgroundColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#1d4b74'; // Светло-синий для common
      case 'rare':
        return '#3f734d'; // Светло-зеленый для rare
      case 'epic':
        return '#703f73'; // Светло-фиолетовый для epic
      case 'legendary':
        return '#b59a48'; // Оранжевый для legendary
      default:
        return '#1d4b74'; // По умолчанию светло-синий
    }
  };

  return (
    <div>
      <h2>Список монстров</h2>
      {error && <p>{error}</p>}
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
          {monsters.map((monster) => (
            <tr key={monster._id} className="monster-row" style={{ backgroundColor: getBackgroundColor(monster.rarity) }}>
              <td>{monster.name}</td>
              <td>{monster.description}</td>
              <td>{monster.rarity}</td>
              <td>{monster.powerLevel}</td>
              <td>
                <button onClick={() => handleDelete(monster._id)} className="delete-button">Удалить</button>
                {monster.acquired && (
                  <Link to={`/battle/${monster._id}`} className="fight-button">Битва</Link>
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
