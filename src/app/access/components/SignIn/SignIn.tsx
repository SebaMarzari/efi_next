'use client'
import { useState, useContext } from "react"
// Next
import { useRouter } from "next/navigation"
// Components
import { Button, Input } from "antd"
// Icons
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons"
// Axios
import axios from "axios"
// Context
import { AuthContext } from "@/app/context/AuthContextProvider/AuthContextProvider"
import { setCookie } from "@/functions/cookies"

const SignIn = () => {
  const router = useRouter()
  const { setUser, setLoading } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const signIn = async () => {
    try {
      setLoading(true)
      await axios.post('/api/auth/signin', {
        email,
        password
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          const {user, accessToken} = res.data
          setUser(user)
          const userStr = JSON.stringify(user)
          const encryptUser = Buffer.from(userStr).toString('base64')
          setCookie('user', encryptUser)
          router.push('/dashboard')
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    } finally {
      const timer = setTimeout(() => {
      setLoading(false)
      },  1000)
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
            type="email"
            placeholder="Email"
            onChange={handleChange(setEmail)}
          />
        </label>
        <label>
          <Input
            type="password"
            placeholder="Contraseña"
            onChange={handleChange(setPassword)}
          />
        </label>
        <a href="#">Olvido la contraseña?</a>
        <Button
          onClick={signIn}
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}

export default SignIn