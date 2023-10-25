'use client'
import { useEffect, useState } from "react";
// Components/antd
import { Button, Input, Table } from "antd";
// Moment
import moment from "moment";
// Styles
import '../../../styles/styles.css'
// Components
import { CustomInput } from "./components";
// ID
import { v4 } from "uuid";
// Types
import { Item } from "./types/Item";
// Utils
import { dataTypes } from "./utils/dataTypes";
import axios from "axios";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";
import { getCookie } from "@/functions/cookies";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const TableForm = () => {
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [dataSource, setDataSource] = useState<Item[]>([])
  const [tables, setTables] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const handleTableChange = (
    key: string,
    dataIndex: string,
    value: string | boolean,
  ) => {
    // TODO handle table change
    const newData = [...dataSource];
    const target = newData.find((item) => item.key === key);
    if (target) {
      // @ts-ignore
      target[dataIndex] = value;
      setDataSource(newData);
    }
  }

  const handleDelete = (id: string) => {
    const newData = dataSource.filter(item => item.key !== id)
    setDataSource(newData)
  }

  const handleGenerate = () => {
    console.log(dataSource)
  }

  const columns = [
    {
      title: 'Nomre de la columna',
      dataIndex: 'columnName',
      key: 'columnName',
      width: '25%',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: '12%',
    },
    {
      title: 'Properties',
      dataIndex: 'properties',
      key: 'properties',
      width: '5.5%',
    },
    {
      title: 'Valor unico',
      dataIndex: 'uniqueValue',
      key: 'uniqueValue',
      width: '6%',
    },
    {
      title: 'Valor por defecto',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: '6%',
    },
    {
      title: 'Nulo',
      dataIndex: 'isNullable',
      key: 'isNullable',
      width: '6%',
    },
    {
      title: 'Tablas existentes',
      dataIndex: 'existingTables',
      key: 'existingTables',
      width: '15.5%',
    },
    {
      title: 'Relacion',
      dataIndex: 'relatedTable',
      key: 'relatedTable',
      width: '15.5%',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (id: string) => (
        <Button onClick={() => handleDelete(id)}>Eliminar</Button>
      ),
      width: '8.5%',
    },
  ];

  const getInputType = (dataIndex: string) => {
    switch (dataIndex) {
      case 'columnName':
        return 'text'
      case 'type':
        return 'dataTypes'
      case 'properties':
        return 'number'
      case 'existingTables':
        return 'existingTables'
      case 'uniqueValue':
        return 'boolean'
      case 'defaultValue':
        return 'boolean'
      case 'isNullable':
        return 'boolean'
      case 'relatedTable':
        return 'relatedTable'
      default:
        return 'actions'
    }
  }

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: getInputType(col.dataIndex),
        dataTypeList: col.dataIndex === 'type' ? dataTypes : [],
        existingTables: col.dataIndex === 'existingTables' ? tables : [],
        fields: col.dataIndex === 'relatedTable' ? fields : [],
        dataIndex: col.dataIndex,
        title: col.title,
        handleChange: handleTableChange,
      }),
    };
  });

  const handleAdd = () => {
    const id = v4()
    const data = {
      key: id,
      columnName: '',
      type: '',
      properties: 0,
      existingTables: '',
      relatedTable: '',
      actions: id,
      uniqueValue: false,
      defaultValue: false,
      isNullable: false,
      createdAt: moment().format(DATE_FORMAT),
      updatedAt: moment().format(DATE_FORMAT),
    }
    setDataSource([...dataSource, data])
  }

  const getTables = async () => {
    const token = getCookie('token')
    const config = getBasicRequestConfig(token)
    const response = await Promise.all([
      axios.get('/api/models', config),
      axios.get('/api/models/list', config),
    ])
    setTables(response[0].data.tableNames)
    setFields(response[1].data.tables)
  }

  useEffect(() => {
    getTables()
  }, [])

  return (
    <div>
      <div
        className="header-table-container"
      >
        <div
          className="inputs-table-container"
        >
          <Input
            placeholder="Nombre de la tabla"
            addonBefore='com.'
            className='input-table-name'
            onChange={handleChange(setName)}
            value={name}
          />
          <Input
            placeholder="Nombre a mostrar"
            className='input-table-name'
            onChange={handleChange(setDisplayName)}
            value={displayName}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Button
            onClick={handleGenerate}
            type="primary"
          >
            Generar
          </Button>
          <Button
            onClick={handleAdd}
            type="primary"
          >
            Agregar
          </Button>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={mergedColumns}
        components={{
          body: {
            cell: CustomInput,
          },
        }}

      />
    </div>
  )
}

export default TableForm