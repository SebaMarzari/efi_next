import { User } from "firebase/auth";

export interface AuthContextTypes {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean; 
    setLoading: (loading: boolean) => void;
}