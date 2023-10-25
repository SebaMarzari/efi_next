'use client'
// Components/antd
import { Table as TableAnt } from "antd";
// Moment
import moment from "moment";
import Link from "next/link";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const Table = () => {
  const dataSource = [
    {
      key: '1',
      name: 'com.empresa.proyecto',
      type: 'STRING',
      characterQty: 20,
      createdAt: moment().format(DATE_FORMAT),
      updatedAt: moment().format(DATE_FORMAT),
      actions: '1'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Cant. Caracteres',
      dataIndex: 'characterQty',
      key: 'characterQty',
    },
    {
      title: 'Creado el',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actializado el',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
  return (
    <TableAnt dataSource={dataSource} columns={columns} />
  )
}

export default Table