import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMonsterById, getRandomMonsterInRange, getMonsters, markMonsterAsAcquired } from '../services/api';

const BattlePage = () => {
  const { id } = useParams();
  const [playerMonster, setPlayerMonster] = useState(null);
  const [opponentMonster, setOpponentMonster] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      const player = await getMonsterById(id);
      setPlayerMonster(player);
      
      const opponent = await getRandomMonsterInRange(player.powerLevel);
      setOpponentMonster(opponent);
    };

    fetchMonsters();
  }, [id]);

  const battleTurn = (attacker, defender) => {
    const damage = Math.floor(
      Math.random() * (attacker.maxAttack - attacker.minAttack + 1) + attacker.minAttack
    );
    defender.health -= damage;
    return `${attacker.name} hits ${defender.name} for ${damage} damage! ${defender.name} has ${defender.health > 0 ? defender.health : 0} health left.`;
  };

  const startBattle = async () => {
    let log = [];
    let player = { ...playerMonster };
    let opponent = { ...opponentMonster };
    let attacker = player;
    let defender = opponent;

    while (player.health > 0 && opponent.health > 0) {
      log.push(battleTurn(attacker, defender));

      if (defender.health <= 0) {
        setWinner(attacker);
        await handleWin(attacker);
        break;
      }

      [attacker, defender] = [defender, attacker];
    }

    setBattleLog(log);
  };

  // Функция для получения случайной редкости на основе вероятности
  const getRarityByChance = () => {
    const roll = Math.floor(Math.random() * 100);
    if (roll < 70) return 'common';
    if (roll < 85) return 'rare';
    if (roll < 95) return 'epic';
    return 'legendary';
  };

const handleWin = async (winner) => {
  try {
    // Проверяем, является ли победителем монстр игрока
    if (winner._id === playerMonster._id) {
      const allMonsters = await getMonsters();

      // Фильтруем монстров, которые еще не приобретены
      const unacquiredMonsters = allMonsters.filter(monster => !monster.acquired);

      if (unacquiredMonsters.length > 0) {
        let newMonster = null;

        // Ролл до тех пор, пока не выпадет уникальный монстр
        while (!newMonster) {
          const rarity = getRarityByChance();

          // Фильтруем монстров по редкости
          const monstersOfRarity = unacquiredMonsters.filter(monster => monster.rarity === rarity);

          if (monstersOfRarity.length > 0) {
            const randomIndex = Math.floor(Math.random() * monstersOfRarity.length);
            const potentialMonster = monstersOfRarity[randomIndex];

            // Проверяем, есть ли этот потенциальный монстр в unacquiredMonsters
            if (!playerMonster || playerMonster._id !== potentialMonster._id) {
              newMonster = potentialMonster;
            }
          }
        }

        await markMonsterAsAcquired(newMonster._id);
        alert(`Вы получили нового монстра: ${newMonster.name}!`);
      } else {
        alert("У вас нет больше доступных монстров для получения!");
      }
    } else {
      alert(`${winner.name} победил, но награда не присуждается, так как победителем стал не ваш монстр.`);
    }
  } catch (error) {
    console.error("Ошибка при получении нового монстра:", error);
  }
};


  if (!playerMonster || !opponentMonster) return <p>Loading...</p>;

  return (
    <div>
      <h2>Battle</h2>
      <h3>{playerMonster.name} vs {opponentMonster.name}</h3>
      <button onClick={startBattle}>Start Battle</button>
      
      <div>
        {battleLog.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>

      {winner && (
        <h3>{winner.name} wins!</h3>
      )}
    </div>
  );
};

export default BattlePage;
