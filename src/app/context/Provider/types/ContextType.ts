import { Dispatch, SetStateAction } from "react"

export type AccessType = 'signin' | 'signup' | null

export interface ContextType {
  accessType: AccessType
  setAccessType: Dispatch<SetStateAction<AccessType>>
}