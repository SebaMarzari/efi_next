import { Model, Optional } from "sequelize";

export interface IUsers {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UsersAttributes extends Required<IUsers> { }
export interface UsersCreationAttributes extends Optional<IUsers, 'id'> { }