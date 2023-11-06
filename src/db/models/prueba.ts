import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface pruebaAttributes {
  id: number;
  display_name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  columna_1: string;
  user_id: number;
}

export type pruebaPk = "id";
export type pruebaId = prueba[pruebaPk];
export type pruebaOptionalAttributes = "id" | "display_name" | "created_at" | "updated_at" | "deleted_at" | "columna_1";
export type pruebaCreationAttributes = Optional<pruebaAttributes, pruebaOptionalAttributes>;

export class prueba extends Model<pruebaAttributes, pruebaCreationAttributes> implements pruebaAttributes {
  id!: number;
  display_name!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  columna_1!: string;
  user_id!: number;

  // prueba belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prueba {
    return sequelize.define('prueba', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Prueba",
      unique: "prueba_display_name_key"
    },
    columna_1: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "hola",
      unique: "prueba_columna_1_key"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "prueba_user_id_key"
    }
  }, {
    tableName: 'prueba',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "prueba_columna_1_key",
        unique: true,
        fields: [
          { name: "columna_1" },
        ]
      },
      {
        name: "prueba_display_name_key",
        unique: true,
        fields: [
          { name: "display_name" },
        ]
      },
      {
        name: "prueba_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "prueba_user_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_index",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof prueba;
  }
}
