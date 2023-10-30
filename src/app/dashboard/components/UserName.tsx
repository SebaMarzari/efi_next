"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserName = () => {
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    // Llama al endpoint para obtener el nombre de usuario
    axios.get("/api/models/fields?tableName=users")
      .then((response) => {
        if (response.data.name) {
          setUserName(response.data.name);
        } else {
          // Si no encuentra el nombre, mantiene el nombre predeterminado
          console.warn("El nombre de usuario no se encontró en la respuesta.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el nombre de usuario:", error);
      });
  }, []);

  return <h2>{userName}</h2>;
};

export default UserName;
