import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../middleware/auth";

export const GET = authMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    await sequelize.sync({ force: false });
    const results = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
    );
    const listTables = results.flat();
    const tableNames = listTables.filter((table) => table !== 'SequelizeMeta');
    const response = tableNames.map((table) => {
      return {
        value: table,
        label: table,
      }
    });
    return NextResponse.json({
      message: 'Modelos obtenidos',
      tableNames: response,
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