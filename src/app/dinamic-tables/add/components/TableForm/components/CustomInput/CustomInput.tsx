'use client'
import { Checkbox, Form, Input, Select } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
// Types
import { Item } from "../../types/Item";
import { ISelect } from "../../types/ISelect";
import { ITable } from "../../types/ITable";
import { useEffect, useState } from "react";


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: string;
  title: any;
  inputType: 'text' | 'actions' | 'dataTypes' | 'existingTables' | 'relatedTable' | 'number' | 'boolean';
  record: Item;
  index: number;
  handleChange: (key: string, dataIndex: string, value: string | boolean) => void;
  dataTypeList: ISelect[];
  existingTables: ISelect[];
  fields: ITable;
  children: React.ReactNode;
}

const CustomInput: React.FC<EditableCellProps> = ({
  dataIndex,
  title,
  inputType,
  record,
  index,
  handleChange,
  dataTypeList,
  existingTables,
  fields,
  children,
  ...restProps
}) => {
  const [relatedTable, setRelatedTable] = useState<ISelect[]>([])

  useEffect(() => {
    const handleSelectTable = (value: string) => {
      if (fields) {
        const table = fields[value]
        const newRelatedTable = table?.map(column => ({ label: column.column_name, value: column.column_name }))
        console.log(newRelatedTable)
        setRelatedTable(newRelatedTable || [])
      }
    }

    if (record && record.existingTables) {
      handleSelectTable(record.existingTables)
    }
  }, [fields, record, record?.existingTables])


  return (
    <td
      {...restProps}
    >
      <Form.Item
        className="form-item"
        rules={[
          {
            required: true,
            message: `Porfavor ingrese ${title}!`,
          },
        ]}
      >
        {
          inputType === 'text' &&
          <Input
            className="input"
            //@ts-ignore
            value={record[dataIndex]}
            onChange={(e) => handleChange(record.key, dataIndex, e.target.value)}
          />
        }
        {
          inputType === 'boolean' && (
            <Checkbox
              style={{ margin: '0 auto' }}
              //@ts-ignore
              checked={record[dataIndex]}
              onChange={(e: CheckboxChangeEvent) => handleChange(record.key, dataIndex, e.target.checked)}
            />
          )
        }
        {
          inputType === 'dataTypes' && (
            <Select
              showSearch
              //@ts-ignore
              value={record[dataIndex]}
              onChange={(value) => handleChange(record.key, dataIndex, value)}
              options={dataTypeList}
            />
          )
        }
        {
          inputType === 'existingTables' && (
            <Select
              showSearch
              //@ts-ignore
              value={record[dataIndex]}
              onChange={(value) => handleChange(record.key, dataIndex, value)}
              options={existingTables}
            />
          )
        }
        {
          inputType === 'relatedTable' && (
            <Select
              showSearch
              //@ts-ignore
              value={record[dataIndex]}
              onChange={(value) => handleChange(record.key, dataIndex, value)}
              options={relatedTable}
            />
          )
        }
        {
          inputType === 'actions' && children
        }
      </Form.Item>
    </td>
  )
}


export default CustomInput