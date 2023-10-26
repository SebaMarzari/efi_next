'use client';
import React, { useEffect, useState } from "react";

interface TableListResponse {
  tables: string[];
  message: string;
}

async function fetchTableList(): Promise<TableListResponse> {
  try {
    const response = await fetch("/api/models/list", {
      method: "GET",
    });

    if (response.status === 200) {
      const data: TableListResponse = await response.json();
      return data;
    }

    throw new Error("Error al obtener la lista de tablas.");
  } catch (error: any) {
    throw new Error("Error al obtener la lista de tablas: " + error.message);
  }
}

const ModelList: React.FC = () => {
  const [tables, setTables] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTableList();
        setTables(response.tables);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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