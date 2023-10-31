"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCookie, deleteCookie } from "@/functions/cookies";
import { getBasicRequestConfig } from "@/functions/getRequestConfig";

interface DecodedToken extends JwtPayload {
  user_id: string;
}

const UserName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const alreadyLoggedUser = getCookie('token');
      try {
        if (alreadyLoggedUser) {
          const decoded = jwt.decode(alreadyLoggedUser) as DecodedToken;

          if (decoded && decoded.user_id) {
            const config = getBasicRequestConfig(alreadyLoggedUser);
            const response = await axios.get(`/api/user?id=${decoded.user_id}`, config);
            const user = response.data.user;
            setUserName(user.name);
          }
        }
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    getUser();
  }, []);

  return <h2>{userName}</h2>;
};

export default UserName;
