'use client'
import { useEffect, useState } from 'react';
// Components
import { Login, Menu } from './components';
// Styles
import './styles/styles.css';
import Link from 'next/link';
import Image from 'next/image';
// Functions
import { deleteCookie, getCookie } from '@/functions/cookies';
import { redirect, usePathname } from 'next/navigation';

const Navbar = () => {
  const path = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const goBack = () => {
    window.history.back();
  };

  const logout = () => {
    deleteCookie('token');
    setIsAuth(false);
    redirect('/');
  }

  useEffect(() => {
    const newToken = getCookie('token');
    setToken(newToken);
  }, [])

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, path]);

  return (
    <div className="header-navbar">
      <div className="logo-container">
        <Image className='logoNav' src='/images/logo.png' width='350' height='100' alt='Logo del Grupo'></Image>
      </div>
      <div className="buttons-container contenedorMyB">
        {isAuth ? (
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