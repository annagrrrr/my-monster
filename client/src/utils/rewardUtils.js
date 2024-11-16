// src/utils/rewardUtils.js

// Функция для определения редкости на основе вероятности
export const getRarityByChance = () => {
    const roll = Math.floor(Math.random() * 100);
    if (roll < 70) return 'common';
    if (roll < 85) return 'rare';
    if (roll < 95) return 'epic';
    return 'legendary';
  };
  
  // Основная функция для выпадения монстра с учетом редкости
  export const getRandomMonsterByRarity = async (playerMonsters, getMonsters) => {
    try {
      const allMonsters = await getMonsters(); // Получаем всех монстров из базы данных
  
      let newMonster = null;
  
      while (!newMonster) {
        // Определяем редкость с учетом шансов
        const rarity = getRarityByChance();
  
        // Фильтруем всех монстров по редкости
        const monstersOfRarity = allMonsters.filter((monster) => monster.rarity === rarity);
  
        // Если есть монстры с такой редкостью, выбираем случайного
        if (monstersOfRarity.length > 0) {
          const randomIndex = Math.floor(Math.random() * monstersOfRarity.length);
          const potentialMonster = monstersOfRarity[randomIndex];
  
          // Проверяем, есть ли этот монстр уже у игрока
          const alreadyAcquired = playerMonsters.some((monster) => monster._id === potentialMonster._id);
  
          if (!alreadyAcquired) {
            newMonster = potentialMonster;
          }
        }
      }
  
      return newMonster;
    } catch (error) {
      console.error("Ошибка при выборе нового монстра:", error);
      return null;
    }
  };
  