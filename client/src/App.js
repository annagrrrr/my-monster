import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MonsterList from './components/MonsterList';
import MonsterForm from './components/MonsterForm';
import Navbar from './components/Navbar';
import BattlePage from './components/BattlePage';

function App() {
  return (
    <Router>
      <Navbar /> {}
      
      <div className="container">
        <Routes>
          <Route path="/" element={<MonsterList />} />
          <Route path="/create" element={<MonsterForm />} />
          <Route path="/battle/:id" element={<BattlePage />} />

        </Routes>
      </div>
    </Router> 
  );
}

export default App;
