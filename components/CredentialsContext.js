import { createContext } from "react";
//credentials Context
export const CredentialsContext = createContext({ storedCredentials: {}, setStoredCredentials: () => {} });