import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const authMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const headers = req.headers;
  let token: string | undefined;
  if (headers) {
    // @ts-ignore
    const authorization = headers.get('authorization');
    token = authorization.replace('Bearer ', '')
  }
  const secret = process.env.JWT_KEY as string;
  if (!token) {
    return NextResponse.json({ message: 'No se proporcionó un token de autenticación.' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secret); // Verify the token using your secret

    // You can perform additional checks here, such as verifying if the user exists in the database, if they have the appropriate permissions, etc.
    if (!decoded) {
      return NextResponse.json({ message: 'Token no válido o vencido.' }, { status: 401 });
    }

    return handler(req, res);
  } catch (error) {
    return NextResponse.json({ message: 'Token no válido o vencido.' }, { status: 401 });
  }
};
