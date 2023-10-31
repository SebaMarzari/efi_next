import React from 'react';
import Image from 'next/image';
// Styles
import './style.css'

export default function App() {
  return (
    <div className='content-index'>
      <header>
        <Image className='imgLogo' src="/images/logo.png" width='150' height='150' alt="Logo del Grupo"  />
      </header>
      <main>
        <h1 className='title'>Automatización del Modelado de Bases de Datos con NextJS y Sequelize</h1>

        <p className='texto'>
          En la era actual, impulsada por avances tecnológicos, la necesidad de crear herramientas
          que aumenten la productividad en el desarrollo de sistemas es más evidente que nunca. 
          Para abordar esta demanda, hemos concebido un sistema en NextJS que revolucionará la 
          creación de modelos de bases de datos.
        </p>

        <p className='texto'>
          Nuestro objetivo es simplificar todo el proceso de modelado, desde la creación de modelos
          hasta la generación automática de archivos Model.js en Sequelize. A través de sencillos 
          formularios, podrás definir modelos, agregar propiedades con detalles personalizados, 
          establecer relaciones entre modelos y hasta crear índices únicos o no.
        </p>

        <p className='texto-invitacion'>
          ¡Ingresa a nuestra plataforma y aumenta tu productividad en el desarrollo de bases de datos!
        </p>

        <Image className='imgDB' src="/images/database.webp" width='350' height='300' alt="Logo del Grupo" />
      </main>
    </div>
  );
}