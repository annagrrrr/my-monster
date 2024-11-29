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
      <Navbar /> {}
      
      <div className="container">
        <Routes>
          <Route path="/" element={<MonsterList />} />
          
          <Route path="/monster/:id" element={<MonsterDetails />} />
          <Route path="/create" element={<MonsterForm />} />
          <Route path="/edit/:id" element={<MonsterEdit />} />
          <Route path="/battle/:id" element={<BattlePage />} />

        </Routes>
      </div>
    </Router> 
  );
}

export default App;
