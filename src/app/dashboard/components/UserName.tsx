"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserName = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Llamar al endpoint para obtener el nombre de usuario
    axios.get("/api/models/fields?tableName=users").then((response) => {
      setUserName(response.data.name);
    });
  }, []);

  return <h1>{userName}</h1>;
};

export default UserName;
