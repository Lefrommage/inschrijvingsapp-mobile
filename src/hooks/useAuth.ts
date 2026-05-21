import { useContext } from "react";
import { AuthContext, ContextProps } from "../contexts/AuthUserProvider";

// Custom hook
export function useAuth(): ContextProps {
  return useContext(AuthContext);
}
