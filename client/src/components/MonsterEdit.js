/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMonsterById, updateMonster } from '../services/api';

const MonsterEdit = () => {
  const { id } = useParams(); // Получаем ID из URL
  const navigate = useNavigate();
  const [monster, setMonster] = useState({
    name: '',
    description: '',
    rarity: '',
    health: '',
    minAttack: '',
    maxAttack: '',
    //acquired: false,
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
    setMonster((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMonster(id, monster);
      navigate('/'); // Перенаправление на список монстров
    } catch (error) {
      console.error('Error updating monster:', error);
    }
  };

  return (
    <div>
      <h2>Edit Monster</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={monster.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={monster.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Rarity:</label>
          <select name="rarity" value={monster.rarity} onChange={handleChange} required>
            <option value="">Select rarity</option>
            <option value="common">common</option>
            <option value="rare">rare</option>
            <option value="epic">epic</option>
            <option value="legendary">legendary</option>
          </select>
        </div>
        <div>
          <label>Health:</label>
          <input type="number" name="health" value={monster.health} onChange={handleChange} required />
        </div>
        <div>
          <label>Min Attack:</label>
          <input type="number" name="minAttack" value={monster.minAttack} onChange={handleChange} required />
        </div>
        <div>
          <label>Max Attack:</label>
          <input type="number" name="maxAttack" value={monster.maxAttack} onChange={handleChange} required />
        </div>
        <div>
          <label>acquired:</label>
          <input type="boolean" name="acquired" value={monster.acquired} onChange={handleChange} required />
        </div>
        <button type="submit">Update Monster</button>
      </form>
    </div>
  );
};

export default MonsterEdit;
*/