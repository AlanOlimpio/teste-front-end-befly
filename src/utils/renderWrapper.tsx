import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import AuthContext, { type AuthContextType } from '@/context/auth-provider';


interface RenderWrapperProps {
    children: React.ReactNode;
    mockContext?: {
        loading: boolean;
        isAuthenticated: boolean;
        authToken: string | null;
        login: () => void;
        logout: () => void;
    };
}

const defaultAuthContext: AuthContextType = {
    loading: false,
    isAuthenticated: false,
    authToken: null,
    login: () => { },
    logout: () => { },
};

const MockAuthProvider = ({ children, mockContext }: RenderWrapperProps) => (
    <AuthContext.Provider value={mockContext ?? defaultAuthContext}>
        {children}
    </AuthContext.Provider>
);

export function RenderWrapper({ children, mockContext }: RenderWrapperProps) {
    return (
        <HelmetProvider>
            <MemoryRouter initialEntries={[{ pathname: "/sign-in", state: { from: "/" } }]}>

                <QueryClientProvider client={queryClient}>
                    <MockAuthProvider mockContext={mockContext}>
                        {children}
                    </MockAuthProvider>
                </QueryClientProvider>

            </MemoryRouter>
        </HelmetProvider>
    );
};