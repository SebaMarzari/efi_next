'use client'
import { Checkbox, Form, Input, Select } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
// Types
import { Item } from "../../types/Item";
import { ISelect } from "../../types/ISelect";


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: string;
  title: any;
  inputType: 'text' | 'actions' | 'dataTypes' | 'select' | 'number' | 'boolean';
  record: Item;
  index: number;
  handleChange: (key: string, dataIndex: string, value: string | boolean) => void;
  dataTypeList: ISelect[];
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
  children,
  ...restProps
}) => {

  return (
    <td {...restProps}>
      <Form.Item
        style={{ margin: 0 }}
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
              //@ts-ignore
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
          inputType === 'actions' && children
        }
      </Form.Item>
    </td>
  )
}


export default CustomInput