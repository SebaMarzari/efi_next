'use client'
// Components
import { Button, Input, Typography } from "antd"
// Icons
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons"

const SignIn = () => {
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
          <Input type="email" placeholder="Email" />
        </label>
        <label>
          <Input type="password" placeholder="Contraseña" />
        </label>
        <a href="#">Olvido la contraseña?</a>
        <Button>Iniciar sesión</Button>
      </form>
    </div>
  )
}

export default SignIn