import { NextRequest, NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../../middleware/auth";
// Utils
import { translateToPostgreSQLTypes } from "./utils/postgresTypes";

export const POST = authMiddleware(async (
  req: NextRequest,
  res: NextResponse,
) => {
  try {
    // @ts-ignore
    const data = await req.json();
    const {
      tableName,
      displayName,
      fields,
      indexes,
    } = data;
    let query = `CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      display_name VARCHAR(255) NOT NULL UNIQUE DEFAULT '${displayName}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP WITH TIME ZONE`;
    let indexesQuery = '';
    fields.forEach(async (field: any) => {
      const columnType = translateToPostgreSQLTypes(field.type);
      query += `,\n${field.columnName} ${columnType} ${field.properties ? `(${field.properties})` : ''}
        ${field.isNullable ? 'NULL' : 'NOT NULL'}
        ${field.uniqueValue ? 'UNIQUE' : ''}
        ${field.defaultValue ? `DEFAULT '${field.value}'` : ''}`;
      if (field.existingTables) {
        indexesQuery += `
        ALTER TABLE ${tableName}
          ADD CONSTRAINT ${field.columnName}_fk
          FOREIGN KEY (${field.columnName})
          REFERENCES ${field.existingTables} (${field.relatedTable});`;
      }
    });
    query += `);`;
    await sequelize.query(query);
    query = '';
    query += indexesQuery;
    await sequelize.query(query);
    query = '';
    if (indexes.length > 0) {
      indexes.forEach((index: any) => {
        query += `\nCREATE INDEX ${index.name} ON ${tableName} (${index.field});`;
      });
    }
    await sequelize.query(query);

    // Export database
    const dbName = process.env.DB_NAME as string;
    const dbUser = process.env.DB_USER as string;
    const dbPassword = process.env.DB_PASSWORD as string;
    const dbHost = process.env.DB_HOST as string;
    const dbPort = Number(process.env.DB_PORT);
    const script = `npx sequelize-auto -o "./src/db/models" -d ${dbName} -h ${dbHost} -u ${dbUser} -p ${dbPort} -x ${dbPassword} -e ${dbUser} --lang ts --noInitModels --useDefine`
    const { exec } = require("child_process");
    exec(script, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
    });
    return NextResponse.json({
      message: 'Tabla creada',
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error al crear tabla",
      error: err,
      status: 500,
    }, { status: 500 })
  }
});