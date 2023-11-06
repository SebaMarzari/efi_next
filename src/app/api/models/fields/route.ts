import { NextRequest, NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';
import { authMiddleware } from "../../middleware/auth";

export const GET = authMiddleware(async (
  req: NextRequest,
  res: NextResponse,
) => {
  try {
    await sequelize.sync({ force: false });
    const { searchParams } = new URL(req.url as string)
    const tableName = searchParams.get('tableName');
    const query = `SELECT 
            column_name,
            data_type,
            is_nullable,
            character_maximum_length,
            column_default
          FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = '${tableName}'`
    const results = await sequelize.query(query);

    return NextResponse.json({
      message: 'Modelos obtenidos',
      data: results[0],
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