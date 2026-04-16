import axiosPrivate from "@/lib/axios";
import { createContext, useEffect, useState } from "react";


interface AuthState {
    accessToken: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    authToken: AuthState['accessToken'] | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export const accessTokenTeste = '@accessTokenTeste';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<AuthState['accessToken'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const login = (newToken: AuthState['accessToken']) => {
        localStorage.setItem(accessTokenTeste, newToken);
        setAuthToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem(accessTokenTeste);
        setAuthToken(null);
        window.location.href = '/sign-in'
    };

    useEffect(() => {
  const storedToken = localStorage.getItem(accessTokenTeste)

  if (storedToken) {
    setAuthToken(storedToken)
  }

    const interceptor = axiosPrivate.interceptors.response.use(
    res => res,
    err => {
        const status = err.response?.status
        if (status === 401 || status === 403) {
        logout()
        }
        return Promise.reject(err)
    }
    )

    setIsLoading(false)

    return () => {
    axiosPrivate.interceptors.response.eject(interceptor)
    }
    }, [])


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!authToken, authToken, login, logout, loading: isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;