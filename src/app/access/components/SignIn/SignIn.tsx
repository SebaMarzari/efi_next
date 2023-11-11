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
import { setCookie } from "@/functions/cookies"

const SignIn = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const signIn = async () => {
    try {
      setLoadingButton(true)
      if (!name || !password) {
        setMessage('Todos los campos son obligatorios')
        setShowAlert(true)
        return
      }
      await axios.post('/api/auth/signin', {
        name,
        password
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res?.data?.status === 200) {
            const { user, accessToken } = res.data
            setShowAlert(false)
            setMessage('')
            setCookie('token', accessToken)
            router.push('/dashboard')
          } else {
            const { message, error } = res.data
            console.log(message, error)
            setMessage('Usuario o contraseña incorrectos')
            setShowAlert(true)
          }
        })
        .catch(err => console.log(err))
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
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Iniciar sesión</h1>
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
            type="name"
            className="label"
            placeholder="Nombre"
            onChange={handleChange(setName)}
            value={name}
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
        {
          showAlert &&
          <p className="alert">{message}</p>
        }
        <a href="#">Olvido la contraseña?</a>
        <Button
          onClick={signIn}
          loading={loadingButton}
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}

export default SignIn