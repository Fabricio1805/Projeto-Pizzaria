import { FormEvent,  useContext, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import { Button } from '../components/ui/Button/Index';
import { Input } from '../components/ui/Input';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Preencha todos os campos!');
      return;
    }

    setLoading(true);
    const data = {
      email,
      password
    };

    await signIn(data);

    setLoading(false);
  };


  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>


      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo sujeito pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={e => setPasword(e.target.value)}
            />


            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});

