'use client'
import { useState } from "react"
// Components
import { Button, Input } from "antd"
// Icons
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons"
import axios from "axios"

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const signUp = async () => {
    try {
      const res = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // const data = await res.json()
      // console.log(data)
    } catch (error) {
      console.log(error)
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
            placeholder="Name"
            value={name}
            onChange={handleChange(setName)}
          />
        </label>
        <label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </label>
        <label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword)}
          />
        </label>
        <Button
          type="primary"
          style={{ marginTop: '9px' }}
          onClick={signUp}
        >
          Registrarme
        </Button>
      </form>
    </div>
  )
}

export default SignUp