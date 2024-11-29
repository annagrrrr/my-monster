import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="button-container">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-button">Список монстров</Link>
        </li>
        <li>
          <Link to="/create" className="nav-button">Создать монстра</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
