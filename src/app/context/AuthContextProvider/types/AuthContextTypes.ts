import { User } from "firebase/auth";

export interface AuthContextTypes {
  user: User | null;
  setUser: (user: null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}