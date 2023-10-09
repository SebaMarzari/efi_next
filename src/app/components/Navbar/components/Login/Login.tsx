import { useContext } from 'react'
import './styles/styles.css'
import { Button } from "antd"
// Hooks
import { useRouter } from 'next/navigation'
// Context
import { Context } from '@/app/context/Provider/Context'
// Types
import { AccessType } from '@/app/context/Provider/types/ContextType'

const Login = () => {
  const { setAccessType } = useContext(Context)
  const router = useRouter()

  const handleNavigate = (access: AccessType) => {
    router.push('access')
    setAccessType(access)
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