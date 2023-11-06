'use client'
import { getCookie } from "@/functions/cookies";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";
// Components/antd
import { Table as TableAnt } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ModelDetails } from "./components";

interface ITable {
  key: string;
  name: string;
  actions: string;
}

const Table = () => {
  const [tables, setTables] = useState<ITable[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleClick = (id: string) => {
    console.log(id);
    setSelectedModel(id);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (name: string) => (
        <div className='buttons-table-container'>
          <button onClick={() => handleClick(name)}>Ver más</button>
        </div>
      )
    },
  ];

  useEffect(() => {
    const getTables = async () => {
      const token = getCookie('token');
      const config = getBasicRequestConfig(token);
      const { data } = await axios.get('/api/models', config);
      setTables(data.tableNames);
    }
    getTables();
  }, [])

  return (
    <div>
      <TableAnt dataSource={tables} columns={columns} />
      {selectedModel && (
        <div>
          <ModelDetails modelName={selectedModel} /> {/* Renderiza ModelDetails con el modelo seleccionado */}
        </div>
      )}
    </div>
  )
}

export default Table