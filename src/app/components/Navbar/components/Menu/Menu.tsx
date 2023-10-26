import React, { useState } from "react";
// Styles
import './styles/styles.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu">
      <div className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </div>
      {isOpen && (
        <ul className="menu-items">
          <li>Mi Cuenta</li>
          <li>Ajustes</li>
          <li>Generador</li>
        </ul>
      )}
    </div>
  );
};

export default Menu;