import React, { FC, ReactNode, useState } from 'react';
// Firebase
import {
  onAuthStateChanged,
  getAuth,
  User,
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

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading, 
      setLoading,
    }}>
      {loading ? (
        <div className='loader-container'>
          <span className='loader'></span>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};