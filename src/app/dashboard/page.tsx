'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContextProvider/AuthContextProvider";
import { getCookie } from "@/functions/cookies";

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const isLogged = getCookie('token')
    if (!isLogged) {
      router.push('/access')
    }
  }, [])

  return (
    <h1> Hello world from dashboard!!</h1>
  );
};

export default Dashboard;
