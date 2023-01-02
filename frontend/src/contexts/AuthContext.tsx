import { createContext, ReactNode, use, useState } from "react";


type AuthContextData = {
    user: UserProps;
    isAutheticated: boolean;
    signIn: (credentials: SigninProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SigninProps = {
    email: string;
    password: string;
}


type AuthProviderProps = {
    children: ReactNode;
}
const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps>();

    const isAutheticated = !!user;
    
    const signIn = async () => {
        alert("CLICOU NO LOGIN")
    }
    return (
        <AuthContext.Provider value={{user, isAutheticated, signIn}}>
            {children} 
        </AuthContext.Provider>
    )
}