"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCookie } from "@/functions/cookies";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";

interface ModelDetailsProps {
  modelName: string;
}

interface DecodedToken extends JwtPayload {
  user_id: string;
}

interface Item {
  key: string;
  column_name: string;
  data_type: string;
  column_default: string;
  is_nullable: string;
  character_maximum_length: number;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ modelName }) => {
  const [details, setDetails] = useState<Item[]>([]);

  useEffect(() => {
    const fetchModelDetails = async () => {
      // Realizo la solicitud a la API para obtener los detalles del modelo
      try {
        const token = getCookie('token');
        if (token) {
          const decoded = jwt.decode(token) as DecodedToken;

          if (decoded && decoded.user_id) {
            const config = getBasicRequestConfig(token);
            const response = await axios.get(`/api/models/fields?tableName=${modelName}`, config);
            console.log(response)
            setDetails(response.data.data);
          }
        }
      } catch (error) {
        console.error("Error al obtener detalles del modelo", error);
        setDetails([
          {
            key: "default",
            column_name: "Nombre de Columna por Defecto",
            data_type: "Tipo por Defecto",
            column_default: 'Columna por Defecto',
            is_nullable: 'NO',
            character_maximum_length: 0
          },
        ]);
      }
    };

    fetchModelDetails();
  }, [modelName]);

  return (
    <div>
      <h2>Detalles del Modelo: {modelName}</h2>
      {details.length > 0 ? (
        <ul>
          {details.map((item, index) => (
            <li key={index}>
              <strong>Nombre de Columna:</strong> {item.column_name}<br />
              <strong>Tipo:</strong> {item.data_type}<br />
              <strong>Valor por Defecto:</strong> {item.column_default}<br />
              <strong>Es Nullable:</strong> {item.is_nullable === "SI" ? "Sí" : "No"}<br />
              <strong>Cantidad de caracteres</strong> {item.character_maximum_length ? "Sí" : "No"}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se pudieron cargar los detalles del modelo.</p>
      )}
    </div>
  );
};
export default ModelDetails;
