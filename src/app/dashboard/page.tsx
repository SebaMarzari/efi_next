'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/functions/cookies";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const isLogged = getCookie('token')
    if (!isLogged) {
      router.push('/access')
    }
  }, [])

  return (
    <div>
      <h1> Hello world from dashboard!!</h1>
      <BarChart/>
    </div>
  );
};

export default Dashboard;
