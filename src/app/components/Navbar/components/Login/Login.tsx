import Link from 'next/link'
import './styles/styles.css'
import { Button } from "antd"

const Login = () => {
  return (
    <div className="login-container">
      <Button type="primary">
        <Link href="/access/signin">
          Iniciar Sesión
        </Link>
      </Button>
      <Button>
        <Link href="/access/signup">
          Registrarme
        </Link>
      </Button>
    </div>
  )
}

export default Login