import { authMiddleware } from "@/middleware/auth";
import ModelList from "../components/ModelList";
// Styles
import './styles/styles.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Bienvenido Usuario!</h1>
      <p>Aqui encontraras tus modelos de database...</p>
      <ModelList />
    </div>
  );
};

export default authMiddleware(Dashboard); 