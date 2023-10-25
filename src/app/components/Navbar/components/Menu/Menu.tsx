import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CustomMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item key="account">Mi cuenta</Menu.Item>
      <Menu.Item key="settings">Ajustes</Menu.Item>
      <Menu.Item key="model-generator">Generador de modelos DB</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <span>
        Menú <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default CustomMenu;
