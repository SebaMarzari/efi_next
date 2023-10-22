import { Dialect, Sequelize } from "sequelize"
import pg from "pg"

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST as string
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD as string
const dbPort = Number(process.env.DB_PORT)

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    dialectModule: pg,
    port: dbPort,
});

export default sequelize