import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const authMiddleware = (handler: (req: NextRequest, res: NextResponse) => Promise<NextResponse>) => async (
  req: NextRequest,
  res: NextResponse,
) => {
  const headers = req.headers;
  let token: string | undefined;
  if (headers) {
    // @ts-ignore
    const authorization = headers.get('authorization');
    token = authorization?.replace('Bearer ', '')
  }
  const secret = process.env.JWT_KEY as string;
  if (!token) {
    return NextResponse.json({ message: 'No se proporcionó un token de autenticación.' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return NextResponse.json({ message: 'Token no válido o vencido.' }, { status: 401 });
    }

    return handler(req, res);
  } catch (error) {
    return NextResponse.json({ message: 'Token no válido o vencido.' }, { status: 401 });
  }
};
