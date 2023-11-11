'use client'
import { useCallback, useEffect, useState } from 'react';
// Next
import { redirect } from 'next/navigation';
// Styles
import './styles/styles.css';
// Components
import {
  SignIn,
  SignUp,
} from './components'
// Components/Antd
import { Button, Typography } from 'antd';
// Functions
import { getCookie } from '@/functions/cookies';
import jwt from 'jsonwebtoken';

const Access = () => {
  const token = getCookie('token');
  const secret = process.env.JWT_KEY as string;
  const [accessType, setAccessType] = useState<'signup' | 'signin'>('signin')

  const handleSignUp = useCallback(() => {
    const container = document.getElementById('container')
    container?.classList.add('right-panel-active')
    setAccessType('signup')
  }, [setAccessType])

  const handleSignIn = useCallback(() => {
    const container = document.getElementById('container')
    container?.classList.remove('right-panel-active')
    setAccessType('signin')
  }, [setAccessType])

  useEffect(() => {
    if (accessType === 'signup') {
      handleSignUp()
    } else if (accessType === 'signin') {
      handleSignIn()
    }
  }, [accessType, handleSignIn, handleSignUp])

  try {
    jwt.verify(token, secret);
    redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

  return (
    <div
      className="access-container"
    >
      <section>
        <div className="container" id="container">
          <SignUp />
          <SignIn />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <Typography>Iniciar sesión</Typography>
                <p>Acceda aquí si ya tiene una cuenta </p>
                <Button
                  className="ghost mt-5"
                  id="signIn"
                  onClick={handleSignIn}
                  type='dashed'
                >
                  Iniciar sesion
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <Typography>Registrarme!</Typography>
                <p>Regístrate si aún no tienes cuenta ... </p>
                <Button
                  className="ghost"
                  id="signUp"
                  onClick={handleSignUp}
                  type='dashed'
                >
                  Registrarme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Access;