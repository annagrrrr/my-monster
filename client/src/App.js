import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MonsterList from './components/MonsterList';
import MonsterDetails from './components/MonsterDetails';
import MonsterEdit from './components/MonsterEdit';
import MonsterForm from './components/MonsterForm';
import Navbar from './components/Navbar';
import BattlePage from './components/BattlePage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Добавляем навигационное меню */}
      
      <div className="container"> {/* Оборачиваем Routes в контейнер */}
        <Routes>
          {/* Маршрут для главной страницы со списком монстров */}
          <Route path="/" element={<MonsterList />} />
          
          {/* Маршрут для страницы с деталями монстра */}
          <Route path="/monster/:id" element={<MonsterDetails />} />

          {/* Маршрут для формы создания монстра */}
          <Route path="/create" element={<MonsterForm />} />
          
          {/* Маршрут для формы редактирования монстра */}
          <Route path="/edit/:id" element={<MonsterEdit />} />

          {/* Новый маршрут для страницы битвы */}
          <Route path="/battle/:id" element={<BattlePage />} />

        </Routes>
      </div>
    </Router> 
  );
}

export default App;
