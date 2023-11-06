import { cookies } from "next/headers";
import { TableForm } from "./components";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";


const AddTable = () => {
  const cookieList = cookies();
  const token = cookieList.get('token');
  const secret = process.env.JWT_KEY as string;

  if (!token) {
    redirect('/access');
  }

  try {
    jwt.verify(token.value, secret);
  } catch (error) {
    redirect('/access');
  }

  return (
    <div>
      <TableForm />
    </div>
  );
}

export default AddTable;