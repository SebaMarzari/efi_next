import './styles/styles.css'
import { Button } from "antd"
// Hooks
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/access')
  }
  return (
    <div className="login-container">
      <Button type="primary" onClick={() => handleNavigate()}>Acceder</Button>
    </div>
  )
}

export default Login