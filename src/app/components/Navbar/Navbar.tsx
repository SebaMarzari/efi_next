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
        <img className='logoNav' src='/images/logo.png' alt='Logo del Grupo'></img> {/* atributo alt para la imagen del logo */}
      </div>
      <div className="buttons-container">
        {user ? (
          <>
            {/* <Menu /> */}
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Navbar;