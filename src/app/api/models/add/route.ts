import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../../middleware/auth";
// Utils
import { translateToPostgreSQLTypes } from "./utils/postgresTypes";

export const POST = authMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse,
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
    query += indexesQuery;
    if (indexes.length > 0) {
      indexes.forEach((index: any) => {
        query += `\nCREATE INDEX ${index.name} ON ${tableName} (${index.field});`;
      });
    }
    console.log(query)
    await sequelize.query(query);
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