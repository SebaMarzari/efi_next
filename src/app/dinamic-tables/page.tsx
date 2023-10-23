'use client'
// Next
import { useRouter } from "next/navigation";
// Components/antd
import { Button, Table, Typography } from "antd";
// Moment
import moment from "moment";
// Styles
import './styles/styles.css'

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const DinamicTables = () => {
  const router = useRouter()
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
          <Button onClick={() => handleEdit(id)}>Editar</Button>
          <Button onClick={() => handleDelete(id)}>Eliminar</Button>
        </div>
      )
    },
  ];

  const handleEdit = (id: string) => {
    console.log('id', id);
  }

  const handleDelete = (id: string) => {
    console.log('id', id);
  }

  const handleAdd = () => {
    router.push('/dinamic-tables/add')
  }

  return (
    <div>
      <div
        className="header-table-container"
      >
        <Typography.Title
          level={2}
          className="title-table"
        >
          Tablas dinamicas
        </Typography.Title>
        <Button onClick={handleAdd}>Agregar</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default DinamicTables;