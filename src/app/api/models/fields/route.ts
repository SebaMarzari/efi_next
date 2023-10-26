import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../../middleware/auth";

export const GET = authMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    await sequelize.sync({ force: false });
    const { searchParams } = new URL(req.url as string)
    const tableName = searchParams.get('tableName');
    const results = await sequelize.query(
      `SELECT json_object_agg('columns', columns) AS column_info
        FROM(SELECT json_agg(json_build_object
          ('vaule', column_name, 'label', column_name)) AS columns
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = '${tableName}'
        GROUP BY table_name) AS table_columns;`
    );
    //@ts-ignore
    const fieldsTable = results[0][0].column_info.columns;
    return NextResponse.json({
      message: 'Modelos obtenidos',
      fieldsTable,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error al obtener nombres de modelos",
      error: err,
      status: 400,
    }, { status: 400 })
  }
});