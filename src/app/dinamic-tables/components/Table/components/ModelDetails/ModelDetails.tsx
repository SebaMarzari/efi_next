"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModelDetailsProps {
  modelName: string;
}

interface Item {
  key: string;
  columnName: string;
  type: string;
  defaultValue: boolean;
  isNullable: boolean;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ modelName }) => {
  const [details, setDetails] = useState<Item[]>([]);

  useEffect(() => {
    const fetchModelDetails = async () => {
      // Realizo la solicitud a la API para obtener los detalles del modelo
      try {
        const response = await axios.get(`/api/models/fields?tableName=${modelName}`);
        setDetails(response.data.data);
      } catch (error) {
        console.error("Error al obtener detalles del modelo", error);
        setDetails([
          {
            key: "default",
            columnName: "Nombre de Columna por Defecto",
            type: "Tipo por Defecto",
            defaultValue: false,
            isNullable: false,
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
          {details.map((item) => (
            <li key={item.key}>
              <strong>Nombre de Columna:</strong> {item.columnName}<br />
              <strong>Tipo:</strong> {item.type}<br />
              <strong>Valor por Defecto:</strong> {item.defaultValue ? "Sí" : "No"}<br />
              <strong>Es Nullable:</strong> {item.isNullable ? "Sí" : "No"}<br />
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
