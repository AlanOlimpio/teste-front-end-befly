import { useContext } from "react";
import AuthContext from "@/context/auth-provider";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return useContext(AuthContext);
}

export default useAuth;