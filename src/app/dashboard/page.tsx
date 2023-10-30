import { authMiddleware } from "@/middleware/auth";
import UserName from "./components";
import Link from "next/link";
import Image from 'next/image';
// Styles
import './styles/styles.css'

const Dashboard = () => {
   
  return (
    <div className="dashboard">
      <h1 className="title">Bienvenido</h1>
      <UserName />
      <p className="text">En esta plataforma, puedes acceder a la lista de tablas de la base de datos y generar nuevos modelos.</p>
      <p className="text">¡Explora y gestiona tus modelos de manera sencilla y eficiente!</p>
      <Link href="/dinamic-tables">
        <button className="generador">Generador</button>
      </Link>

      <p className="text">También podes acceder a la herramienta desde Menu, como se muestra en la siguiente imagen:</p>
      <Image className="capturaMenu" src='/images/menu.png' width='250' height='300' alt="captura de menu"></Image>
    </div>
  );
};

export default authMiddleware(Dashboard);