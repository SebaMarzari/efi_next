import React, { useState } from "react";
import Link from 'next/link';
// Styles
import './styles/styles.css';
import { authMiddleware } from "@/middleware/auth";

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
          <Link href="/dinamic-tables">
            <li>Generador</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Menu;