import { useContext } from 'react';
// Context
import { AuthContext } from '@/app/context/AuthContextProvider/AuthContextProvider';
// Components
import { Login, Menu } from './components';
// Styles
import './styles/styles.css';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const goBack = () => {
      window.history.back();
  };

  return (
    <div className="header-navbar">
      <div className="logo-container">
        <img className='logoNav' src='/images/logo.png' alt='Logo del Grupo'></img>
      </div>
      <div className="buttons-container contenedorMyB">
        {user ? (
          <>
            <button className='volver' onClick={goBack}>
              <p> &laquo; </p>
            </button>

            <Link href='/'>
              <button className='cerrarS' onClick={logout}>Cerrar sesión</button>
            </Link>
            
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