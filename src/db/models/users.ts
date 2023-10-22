import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './sequelize';
import { UsersAttributes, UsersCreationAttributes } from './types/IUsers';

// Declare the model
class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // name of the model in the database
  public static modelName = 'users';
}

// Init model
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Connect to database
    modelName: 'users', // Name of the model in the database
  }
);

export default Users;
