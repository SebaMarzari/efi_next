import { useContext } from 'react';
// Context
import { AuthContext } from '@/app/context/AuthContextProvider/AuthContextProvider';
// Components
import { Login, Menu } from './components';
// Styles
import './styles/styles.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="header-navbar">
      <div className="logo-container">
        <img className='logoNav' src='/images/logo.png' alt='Logo del Grupo'></img>
      </div>
      <div className="buttons-container contenedorMyB">
        {user ? (
          <>
            <button className='cerrarS' onClick={logout}>Cerrar sesión</button>
            <Menu />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Navbar;