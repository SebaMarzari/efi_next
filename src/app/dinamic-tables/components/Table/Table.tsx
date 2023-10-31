'use client'
import { ISelect } from "@/app/types/ISelect";
import { getCookie } from "@/functions/cookies";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";
// Components/antd
import { Table as TableAnt } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModelDetails from "@/app/dinamic-tables/components/Table/components/ModelDetails/ModelDetails";

interface ITable {
  key: string;
  name: string;
}

const Table = () => {
  const [tables, setTables] = useState<ITable[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

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
      render: (id: string) => (
        <div className='buttons-table-container'>
          <button onClick={() => setSelectedModel(id)}>Ver más</button>
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