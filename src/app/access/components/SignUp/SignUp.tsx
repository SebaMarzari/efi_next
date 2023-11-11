'use client'
import { useState } from "react"
// Next
import { useRouter } from "next/navigation"
// Components
import { Button, Input } from "antd"
// Icons
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons"
// Axios
import axios from "axios"
// Functions
import { setCookie } from "@/functions/cookies"

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const SignUp = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const signUp = async () => {
    try {
      if (!name || !email || !password) {
        setMessage('Todos los campos son obligatorios')
        setShowAlert(true)
        return
      }
      if (password.length < 8 || password.length > 15) {
        setMessage('La contraseña debe tener al menos 8 caracteres y máximo 15')
        setShowAlert(true)
        return
      }
      if (!PASSWORD_REGEX.test(password)) {
        setMessage('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial')
        setShowAlert(true)
        return
      }
      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden')
        setShowAlert(true)
        return
      }
      setLoadingButton(true)
      await axios.post('/api/auth/signup', {
        name,
        email,
        password
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res?.data?.status === 201) {
            const { token, user } = res.data
            setShowAlert(false)
            setMessage('')
            setCookie('token', token)
            router.push('/dashboard')
          } else {
            const { message, error } = res.data
            console.log(message, error)
            setMessage(`Algo salió mal, intente nuevamente: ${error.code}`)
            setShowAlert(true)
          }
        })
        .catch(err => {
          console.log('ERROR SIGNUP', err)
        })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingButton(false)
      const timer = setTimeout(() => {
      }, 1000)
      return () => clearTimeout(timer)
    }
  }

  return (
    <div className="form-container sign-up-container">
      <form action="#">
        <h1>Registrarme</h1>
        <div className="social-container">
          <a href="https://github.com/SebaMarzari" target="_blank" className="social">
            <GithubOutlined />
          </a>
          <a href="https://www.linkedin.com/in/sebasti%C3%A1n-marzari-2a130b174/" target="_blank" className="social">
            <LinkedinOutlined />
          </a>
          <a href="mailto:sebamarzari98@gmail.com" target="_blank" className="social">
            <MailOutlined />
          </a>
        </div>
        <label>
          <Input
            type="text"
            className="label"
            placeholder="Nombre"
            value={name}
            onChange={handleChange(setName)}
            status={showAlert ? 'error' : undefined}
          />
        </label>
        <label>
          <Input
            type="email"
            className="label"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
            status={showAlert ? 'error' : undefined}
          />
        </label>
        <label>
          <Input.Password
            type="password"
            className="label password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChange(setPassword)}
            status={showAlert ? 'error' : undefined}
          />
        </label>
        <label>
          <Input.Password
            type="password"
            className="label password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            status={showAlert ? 'error' : undefined}
          />
        </label>
        {
          showAlert &&
          <p className="alert">{message}</p>
        }
        <Button
          type="primary"
          style={{ marginTop: '9px' }}
          onClick={signUp}
          loading={loadingButton}
        >
          Registrarme
        </Button>
      </form>
    </div>
  )
}

export default SignUp