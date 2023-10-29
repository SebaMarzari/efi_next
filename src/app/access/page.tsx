'use client'
import { useCallback, useContext, useEffect } from 'react';
// Next
import { useRouter } from 'next/navigation';
// Styles
import './styles/styles.css';
// Components
import {
  SignIn,
  SignUp,
} from './components'
// Components/Antd
import { Button, Typography } from 'antd';
// Context
import { Context } from '@/app/context/Provider/Context';
import { AuthContext } from '../context/AuthContextProvider/AuthContextProvider';
// Functions
import { getCookie } from '@/functions/cookies';


const Access = () => {
  const {
    accessType,
    setAccessType,
  } = useContext(Context)
  const { token } = useContext(AuthContext)
  const router = useRouter()

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

  useEffect(() => {
    const isLogged = getCookie('token')
    if (isLogged && token) {
      router.push('/dashboard')
    }
  }, [token, router])

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