import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import sequelize from '@/db/models/sequelize';

export const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const models = Object.keys(sequelize.models)
    console.log(sequelize)
    return NextResponse.json({
      message: 'Modelos obtenidos',
      models,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error al obtener usuario",
      error: err,
      status: 400,
    }, { status: 400 })
  }
};