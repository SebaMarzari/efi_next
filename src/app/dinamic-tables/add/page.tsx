import { authMiddleware } from "@/middleware/auth";
import { TableForm } from "./components";


const AddTable = () => {

  return (
    <div>
      <TableForm />
    </div>
  );
}

export default authMiddleware(AddTable);