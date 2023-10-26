'use client';
import React, { useEffect, useState } from "react";
// Styles
import './styles/styles.css'

interface TableListResponse {
  tables: string[];
  message: string;
}

const ModelList: React.FC = () => {
  const [tables, setTables] = useState<string[] | null>(null);

  const fetchTableList = async () => {
    try {
      const response = await fetch("/api/models/list", {
        method: "GET",
      });

      if (response.status === 200) {
        const data: TableListResponse = await response.json();
        setTables(data.tables);
      } else {
        console.error("Error al obtener la lista de tablas. Código de estado:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener la lista de tablas:", error);
    }
  };

  useEffect(() => {
    fetchTableList();
  }, []);

  return (
    <div className="modelList">
      <h1>Listado de Tablas</h1>
      {tables ? (
        <table>
          <thead>
            <tr>
              <th>Nombre de la Tabla</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => (
              <tr key={index}>
                <td>{table}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay tablas disponibles.</p>
      )}
    </div>
  );
};

export default ModelList;