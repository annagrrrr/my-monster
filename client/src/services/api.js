import axios from 'axios';

// Создание экземпляра axios с базовым URL
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Измените на ваш URL API
});

const BATTLE_URL = 'http://localhost:5000/api/battle';
const API_URL = 'http://localhost:5000/api/monsters';

// Получение всех монстров
export const getMonsters = async () => {
    const response = await api.get('/monsters');
    return response.data;
};

// Получение монстра по ID
export const getMonsterById = async (id) => {
    const response = await api.get(`/monsters/${id}`);
    return response.data;
};

// Создание нового монстра
export const createMonster = async (monsterData) => {
    const response = await axios.post(API_URL, monsterData);
    return response.data;
  };

// Обновление монстра
export const updateMonster = async (id, monster) => {
    const response = await api.put(`/monsters/${id}`, monster);
    return response.data;
};

// Удаление монстра
export const deleteMonster = async (id) => {
    await api.delete(`/monsters/${id}`);
};

// Получение информации о сервере
export const getServerInfo = async () => {
    const response = await api.get('/server-info'); // Используем базовый URL
    return response.data;
};

// Получение случайного монстра с аналогичным powerLevel в диапазоне ±5
export const getRandomMonsterInRange = async (powerLevel) => {
  const response = await axios.post(`${BATTLE_URL}/opponent`, { powerLevel });
  return response.data;
};

export const markMonsterAsAcquired = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/monsters/${id}`, { acquired: true });
      return response.data; // Вернуть обновлённые данные
    } catch (error) {
      console.error("Ошибка при пометке монстра как приобретённого", error);
      throw error;
    }
}
  