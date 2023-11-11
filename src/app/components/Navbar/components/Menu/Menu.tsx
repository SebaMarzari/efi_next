import Link from 'next/link';
// Styles
import './styles/styles.css';

const Menu = () => {
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
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