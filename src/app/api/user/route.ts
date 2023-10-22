import { authMiddleware } from "@/middleware/auth";
import { getUserById, getUserByName } from "@/db/dal/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = authMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { searchParams } = new URL(req.url as string)
    const id = searchParams.get('id');
    if (id) {
      const user = await getUserById(Number(id));
      return NextResponse.json({
        message: 'Usuario obtenido',
        user,
        status: 200,
      });
    }
    return NextResponse.json({
      message: 'Usuario no encontrado',
      status: 404,
    }, { status: 404 });
  } catch (err) {
    return NextResponse.json({
      message: "Error al obtener usuario",
      error: err,
      status: 400,
    }, { status: 400 })
  }
});