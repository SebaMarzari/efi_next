import type { NextApiResponse } from "next";
// Firebase
import firebase_app from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function POST(
  req: Request,
) {
  try {
    const json = await req.json();
    const { email, password } = json;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const {user} = result;
    return Response.json({
      message: "Usuario registrado con éxito",
      data: user,
      status: 200,
    })
  } catch (error) {
    console.log(error)
  }
}