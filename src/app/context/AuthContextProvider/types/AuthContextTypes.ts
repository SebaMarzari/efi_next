import { UsersAttributes } from "@/db/models/types/IUsers";

export interface AuthContextTypes {
  user: UsersAttributes | null;
  setUser: (user: null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void; // Agrego la propiedad logout
}