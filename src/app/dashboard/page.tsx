'use client'
import { useContext } from "react";
// Next
import { useRouter } from "next/navigation";
// Context
import { AuthContext } from "@/app/context/AuthContextProvider/AuthContextProvider";

const dashboard = () => {
    const {user} = useContext(AuthContext);
    const router = useRouter();

    if (!user) {
        router.push('/access');
    }

    return (
        <h1> Hello world from dashboard!!</h1>
    )
}

export default dashboard;