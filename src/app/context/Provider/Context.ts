import { createContext } from "react";
import { ContextType } from "./types/ContextType";

export const Context = createContext<ContextType>({
  accessType: null,
  setAccessType: () => { }
})