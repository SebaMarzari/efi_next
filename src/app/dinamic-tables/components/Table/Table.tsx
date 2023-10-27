'use client'
import { ISelect } from "@/app/types/ISelect";
import { getCookie } from "@/functions/cookies";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";
// Components/antd
import { Table as TableAnt } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ITable {
  key: string;
  name: string;
}

const Table = () => {
  const [tables, setTables] = useState<ITable[]>([])
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
          <Link
            href={`/dinamic-tables/edit/${id}`}
          >
            Editar
          </Link>
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
    <TableAnt dataSource={tables} columns={columns} />
  )
}

export default Table