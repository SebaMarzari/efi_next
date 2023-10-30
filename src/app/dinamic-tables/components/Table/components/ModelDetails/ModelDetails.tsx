import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModelDetailsProps {
  modelName: string;
}

interface Item {
  key: string;
  columnName: string;
  type: string;
  properties: string;
  existingTables: string;
  relatedTable: string;
  uniqueValue: boolean;
  defaultValue: boolean;
  value: string;
  isNullable: boolean;
  actions: string;
  createdAt: string;
  updatedAt: string;
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
            properties: "Propiedades por Defecto",
            existingTables: "Tablas Existentes por Defecto",
            relatedTable: "Tabla Relacionada por Defecto",
            uniqueValue: false,
            defaultValue: false,
            value: "Valor por Defecto",
            isNullable: false,
            actions: "Acciones por Defecto",
            createdAt: "Creado en por Defecto",
            updatedAt: "Actualizado en por Defecto",
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
              <strong>Propiedades:</strong> {item.properties}<br />
              <strong>Tablas Existentes:</strong> {item.existingTables}<br />
              <strong>Tabla Relacionada:</strong> {item.relatedTable}<br />
              <strong>Valor Único:</strong> {item.uniqueValue ? "Sí" : "No"}<br />
              <strong>Valor por Defecto:</strong> {item.defaultValue ? "Sí" : "No"}<br />
              <strong>Valor:</strong> {item.value}<br />
              <strong>Es Nullable:</strong> {item.isNullable ? "Sí" : "No"}<br />
              <strong>Acciones:</strong> {item.actions}<br />
              <strong>Creado en:</strong> {item.createdAt}<br />
              <strong>Actualizado en:</strong> {item.updatedAt}<br />
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