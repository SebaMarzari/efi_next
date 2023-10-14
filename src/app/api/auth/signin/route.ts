// Firebase
import firebase_app from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export async function POST(
  req: Request,
) {
  try {
    const json = await req.json();
    const { email, password } = json;
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { user } = result;
    const accessToken = await user.getIdToken();
    return Response.json({
      message: "Inicio de sesión exitoso",
      user,
      accessToken,
      status: 200,
    })
  } catch (error) {
    return Response.json({
      message: "Error al iniciar sesión",
      error,
      status: 500,
    })
  }
}