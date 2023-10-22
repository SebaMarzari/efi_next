import React, { FC, ReactNode, useState } from 'react';
// Firebase
import {
  onAuthStateChanged,
  getAuth,
  User,
  signOut, // Importo la función de cierre de sesión de Firebase
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { AuthContextTypes } from './types/AuthContextTypes';
// Functions
import { getCookie } from '@/functions/cookies';
// Styles
import './styles/styles.css'

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<AuthContextTypes>({
  user: null,
  setUser: () => { },
  loading: true, 
  setLoading: (state: boolean) => { },
  logout: () => { }, // Me aseguro de que el logout esté definido en el contexto
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        const alreadyLoggedUser = getCookie('user');
        if (alreadyLoggedUser) {
          const decryptUser = Buffer.from(alreadyLoggedUser, "base64").toString();
          setUser(JSON.parse(decryptUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); // Cerrar sesión con Firebase
      setUser(null); // Establece el usuario en null después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading, 
      setLoading,
      logout, // Agrego la funcion logout al contexto
    }}>
      {loading ? (
        <div className='loader-container'>
          <span className='loader'></span>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};