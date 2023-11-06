import { NextRequest, NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../middleware/auth";

export const GET = authMiddleware(async (
  req: NextRequest,
  res: NextResponse,
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
        key: table,
        name: table,
        actions: table,
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