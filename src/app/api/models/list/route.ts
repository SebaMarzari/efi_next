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
    let query = "SELECT json_object_agg(table_name, columns) AS table_info "
    query += "FROM(SELECT table_name, json_agg(json_build_object "
    query += "('column_name', column_name, 'data_type', data_type)) AS columns "
    query += "FROM information_schema.columns WHERE table_schema = 'public' "
    query += "AND table_name <> 'SequelizeMeta' GROUP BY table_name) AS table_columns;"
    const results = await sequelize.query(query);
    const tableInfo = results.flat()[0];
    //@ts-ignore
    const tables = tableInfo.table_info;

    return NextResponse.json({
      message: 'Modelos obtenidos',
      tables,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error al obtener lista de modelos",
      error: err,
      status: 400,
    }, { status: 400 })
  }
});