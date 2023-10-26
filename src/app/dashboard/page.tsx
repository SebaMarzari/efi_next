import { authMiddleware } from "@/middleware/auth";
// import BarChart from "../components/BarChart";

const Dashboard = () => {
  return (
    <div>
      <h1> Hello world from dashboard!!</h1>
      {/* <BarChart/> */}
    </div>
  );
};

export default authMiddleware(Dashboard);