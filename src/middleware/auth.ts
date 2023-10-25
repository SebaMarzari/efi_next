import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export const authMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const cookieList = cookies()
  const token = cookieList.get('token')
  const secret = process.env.JWT_KEY as string;
  if (!token) {
    return redirect('/access')
  }

  try {
    const decoded = jwt.verify(token.value, secret);

    if (!decoded) {
      cookieList.delete('token')
      return redirect('/access')
    }

    return handler(req, res);
  } catch (error) {
    return redirect('/access')
  }
};
