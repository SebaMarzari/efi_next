import { createUser, getUserByName } from '@/db/dal/user';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export async function POST(
  req: Request,
) {
  try {
    const json = await req.json();
    const {
      name,
      email,
      password
    } = json;

    if (!(name && email && password)) {
      throw new Error("Todos los campos son requeridos");
    }

    // check if user already exist
    const oldUser = await getUserByName(name);
    if (oldUser) {
      throw new Error("El usuario ya existe");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const response = await createUser({
      name: name as string,
      email: email.toLowerCase() as string,
      password: encryptedPassword as string,
    });

    // Create token
    const token = jwt.sign(
      { user_id: response.id, email },
      process.env.JWT_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    return Response.json({
      message: 'Usuario creado',
      token,
      user: response,
      status: 201,
    });
  } catch (err) {
    return Response.json({
      message: "Error al registrar usuario",
      error: err,
      status: 400,
    })
  }
}