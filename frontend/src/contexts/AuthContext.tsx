import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}
export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;
        setUser({
          id,
          name,
          email,
        });
      }).catch(() => {
        signOut();
      });
    }
  }, []);
  async function signIn({email, password }: SignInProps){
    try {
      const response = await api.post('/session', {
        email,
        password
      });

      console.log(response.data);
      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mes
        path: '/' // quais caminhos terão acesso ao cookies
      });

      setUser({
        id,
        name,
        email,
      });

      //passar para proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Bem vindo ao sistema!');
      // Redirecionar o usuario para o /dashboard
      Router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao tentar logar no sistema!');
      console.log('ERRO AO ACESSAR', error);
    }
  }


  async function signUp({name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      });

      toast.success('Usuário salvo com sucesso!');
      Router.push('/');

    } catch (error) {
      toast.error('Erro ao salvar usuário!');
      console.log('Erro ao cadastrar! ',error);
    }
  }
  return (

    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
