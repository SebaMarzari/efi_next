import UserName from "./components";
import Link from "next/link";
import Image from 'next/image';
// Styles
import './styles/styles.css'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const Dashboard = () => {
  const cookieList = cookies();
  const token = cookieList.get('token');
  const secret = process.env.JWT_KEY as string;

  if (!token) {
    redirect('/access');
  }

  try {
    jwt.verify(token.value, secret);
  } catch (error) {
    redirect('/access');
  }

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

export default Dashboard;