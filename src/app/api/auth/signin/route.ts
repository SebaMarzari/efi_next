// Token
import jwt from "jsonwebtoken";
// Bcrypt
import bcrypt from "bcryptjs";
import { getUserByName } from "@/db/dal/user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const json = await req.json();
    const { name, password } = json;

    const response = await getUserByName(name);
    if (!response) {
      throw new Error("Usuario no encontrado");
    }
    if (response && (await bcrypt.compare(password, response.password))) {

      // Create token
      const token = jwt.sign(
        { user_id: response.id, email: response.email },
        process.env.JWT_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      return NextResponse.json({
        message: "Inicio de sesión exitoso",
        user: response,
        accessToken: token,
        status: 200,
      })
    }
    return NextResponse.json({
      message: "Usuario o contraseña incorrectos",
      status: 401,
    }, { status: 401 })
  } catch (error) {
    return NextResponse.json({
      message: "Error al iniciar sesión",
      error,
      status: 500,
    }, { status: 500 })
  }
}