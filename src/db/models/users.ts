import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "name" | "email" | "password" | "createdAt" | "updatedAt";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    }, {
      tableName: 'users',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: "users_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    }) as typeof users;
  }
}
