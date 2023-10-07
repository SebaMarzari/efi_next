import './styles/styles.css'
import { Button } from "antd"
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const handleNavigate = (route: string) => {
    router.push(`/${route}`)
  }
  return (
    <div className="login-container">
      <Button
        onClick={() => handleNavigate('signin')}
      >
        Iniciar Sesión
      </Button>
      <Button
        type="primary"
        onClick={() => handleNavigate('signup')}
      >
        Registrarme
      </Button>
    </div>
  )
}

export default Login