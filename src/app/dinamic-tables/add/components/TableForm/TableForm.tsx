'use client'
import { useEffect, useState } from "react";
// Next
import { useRouter } from "next/navigation";
// Components/antd
import { Button, Input, Select, Table, Typography } from "antd";
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
import { ITable } from "./types/ITable";
// Utils
import { dataTypes } from "./utils/dataTypes";
import axios from "axios";
// Functions
import { getBasicRequestConfig, getContentTypeJsonRequestConfig } from "@/functions/getRequestConfig";
import { getCookie } from "@/functions/cookies";
import { Index } from "./types/Index";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const TableForm = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [dataSource, setDataSource] = useState<Item[]>([])
  const [tables, setTables] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])
  const [indexName, setIndexName] = useState<string>('')
  const [indexValue, setIndexValue] = useState<string>('')
  const [indexes, setIndexes] = useState<Index[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const handleGenerate = async () => {
    setIsLoading(true)
    const data = {
      tableName: name,
      displayName,
      fields: dataSource,
      indexes,
    }
    const token = getCookie('token')
    const config = getContentTypeJsonRequestConfig(token)
    const response = await axios.post('/api/models/add', data, config)
    if (response.status === 200) {
      router.push('/dinamic-tables')
    }
    setIsLoading(false)
  }

  const columns = [
    {
      title: 'Nomre de la columna',
      dataIndex: 'columnName',
      key: 'columnName',
      width: '18%',
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
      title: 'Nulo',
      dataIndex: 'isNullable',
      key: 'isNullable',
      width: '6%',
    },
    {
      title: 'Valor por defecto',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: '6%',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      width: '10%',
    },
    {
      title: 'Tablas existentes',
      dataIndex: 'existingTables',
      key: 'existingTables',
      width: '14%',
    },
    {
      title: 'Relacion',
      dataIndex: 'relatedTable',
      key: 'relatedTable',
      width: '14%',
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
        return 'text'
      case 'existingTables':
        return 'existingTables'
      case 'uniqueValue':
        return 'boolean'
      case 'defaultValue':
        return 'boolean'
      case 'value':
        return 'text'
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
      properties: '',
      existingTables: '',
      relatedTable: '',
      actions: id,
      uniqueValue: false,
      defaultValue: false,
      value: '',
      isNullable: false,
      createdAt: moment().format(DATE_FORMAT),
      updatedAt: moment().format(DATE_FORMAT),
    }
    setDataSource([...dataSource, data])
  }

  const handleSelectIndex = (setState: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    setState(value)
  }

  const handleAddIndex = () => {
    const names = indexes.map(item => item.name)
    if (names.includes(indexName)) return
    const data = {
      id: v4(),
      name: indexName,
      field: indexValue,
      actions: indexName,
    }
    setIndexes([...indexes, data])
    setIndexName('')
    setIndexValue('')
  }

  const handleRemoveIndex = (name: string) => {
    const newData = indexes.filter(item => item.name !== name)
    setIndexes(newData)
  }

  const getTables = async () => {
    const token = getCookie('token')
    const config = getBasicRequestConfig(token)
    const response = await Promise.all([
      axios.get('/api/models', config),
      axios.get('/api/models/list', config),
    ])
    const tables = response[0].data.tableNames.map((item: ITable) => ({
      label: item.name,
      value: item.name,
    }))
    setTables(tables)
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
            addonBefore='Nombre de la tabla'
            className='input-table-name'
            onChange={handleChange(setName)}
            value={name}
          />
          <Input
            placeholder="Nombre a mostrar"
            addonBefore='Nombre a mostrar'
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
            loading={isLoading}
            disabled={!name || !displayName || !dataSource.length}
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
        pagination={false}
        scroll={{ y: 250 }}
      />
      <div
        className="index-table-container"
      >
        <div
          className="header-table-container"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Typography.Title
              level={5}
              style={{
                margin: '1rem 0',
              }}
            >
              Indices
            </Typography.Title>
            <Input
              placeholder="Nombre del indice"
              style={{
                width: 300,
              }}
              onChange={handleChange(setIndexName)}
              value={indexName}
            />
            <Select
              showSearch
              placeholder="Seleccione un campo"
              options={dataSource.map(item => ({
                label: item.columnName,
                value: item.columnName,
              }))}
              style={{
                width: 300,
              }}
              onChange={handleSelectIndex(setIndexValue)}
              value={indexValue}
            />
          </div>
          <Button
            onClick={handleAddIndex}
            type="primary"
            disabled={!indexValue && !indexName}
          >
            Agregar indice
          </Button>
        </div>
        <Table
          style={{
            width: '100%',
          }}
          dataSource={indexes}
          columns={[
            {
              title: 'Nombre',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Campo',
              dataIndex: 'field',
              key: 'field',
            },
            {
              title: 'Acciones',
              dataIndex: 'actions',
              key: 'actions',
              render: (name: string) => (
                <Button onClick={() => handleRemoveIndex(name)}>Eliminar</Button>
              ),
            }
          ]}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default TableForm