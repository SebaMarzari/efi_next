import { authMiddleware } from "@/middleware/auth";
import ModelList from "../components/ModelList";

const Dashboard = () => {
  return (
    <div>
      <h1> Hello world from dashboard!!</h1>
      <ModelList />
    </div>
  );
};

export default authMiddleware(Dashboard);