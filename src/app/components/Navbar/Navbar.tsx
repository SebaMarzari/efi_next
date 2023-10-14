import { useContext } from 'react';
// Context
import { AuthContext } from '@/app/context/AuthContextProvider/AuthContextProvider';
// Components
import { Login, Menu } from './components';
// Styles
import './styles/styles.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="header-navbar">
      {
        user ? (
          <Menu />
        ) : (
          <Login />
        )
      }
    </div>
  )
}

export default Navbar;