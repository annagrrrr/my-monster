import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMonsterById } from '../services/api'; // Убедитесь, что вы импортируете только нужные функции

const MonsterDetails = () => {
  const { id } = useParams();
  const [monster, setMonster] = useState(null);

  useEffect(() => {
    const fetchMonster = async () => {
      const data = await getMonsterById(id);
      setMonster(data);
    };
    fetchMonster();
  }, [id]);


  if (!monster) return <p>Loading...</p>;

  return (
    <div>
      <h2>{monster.name}</h2>
      <p>{monster.description}</p>
      <p>Power Level: {monster.powerLevel}</p>
      <p>Health: {monster.health}</p>
      <p>Attack: {monster.minAttack} - {monster.maxAttack}</p>
    </div>
  );
};

export default MonsterDetails;
