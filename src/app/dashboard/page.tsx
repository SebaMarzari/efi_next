import { authMiddleware } from "@/middleware/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
// Styles
import './styles/styles.css'

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/models/fields?tableName=users")
      .then((response) => response.json())
      .then((data) => setUserName(data.userName))
      .catch((error) => console.error("Error al obtener el nombre de usuario", error));
  }, []);
   
  return (
    <div className="dashboard">
      <h1 className="title">Hola, {userName || "Usuario"}</h1> 
      <p className="text">En esta plataforma, puedes acceder a la lista de tablas de la base de datos y generar nuevos modelos.</p>
      <p className="text">¡Explora y gestiona tus modelos de manera sencilla y eficiente!</p>
      <Link href="/dinamic-tables">
        <button className="generador">Generador</button>
      </Link>

      <p className="text">También podes acceder a la herramienta desde Menu, como se muestra en la siguiente imagen:</p>
      <img className="capturaMenu" src='/images/menu.png'></img>
    </div>
  );
};

export default authMiddleware(Dashboard);