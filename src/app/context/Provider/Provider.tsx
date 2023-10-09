import { FC, ReactNode, useState } from "react";
// Types
import { AccessType, ContextType } from "./types/ContextType";
import { Context } from "./Context";

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [accessType, setAccessType] = useState<AccessType>(null)

  const value: ContextType = {
    accessType,
    setAccessType,
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider