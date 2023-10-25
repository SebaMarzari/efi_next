import { authMiddleware } from "@/middleware/auth";

const Dashboard = () => {
  return (
    <h1> Hello world from dashboard!!</h1>
  );
};

export default authMiddleware(Dashboard);