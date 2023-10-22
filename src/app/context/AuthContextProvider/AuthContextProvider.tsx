import React, { FC, ReactNode, useState } from 'react';
// Token
import jwt from 'jsonwebtoken';
//Types
import { AuthContextTypes } from './types/AuthContextTypes';
// Functions
import { getCookie } from '@/functions/cookies';
// Styles
import './styles/styles.css'
// Axios
import axios from 'axios';
// Functions
import { getBasicRequestConfig } from '@/functions/getRequestConfig';


export const AuthContext = React.createContext<AuthContextTypes>({
  user: null,
  setUser: () => { },
  loading: true,
  setLoading: (state: boolean) => { },
  token: null,
  setToken: (token: string | null) => { },
  logout: () => { }, // Me aseguro de que el logout esté definido en el contexto
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    const alreadyLoggedUser = getCookie('token');
    if (alreadyLoggedUser) {
      setToken(alreadyLoggedUser);
      const decoded = jwt.decode(alreadyLoggedUser); // Verify the token using your secret
      const config = getBasicRequestConfig(alreadyLoggedUser)
      // @ts-ignore
      const response = await axios.get(`/api/user?id=${decoded.user_id}`, config)
      const user = response.data.user
      setUser(user);
    } else {
      setUser(null);
    }
  }

  React.useEffect(() => {
    getUser()
  }, []);

  const logout = async () => {
    try {
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
      token,
      setToken,
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