import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { Button } from "../../components/ui/Button/Index";
import { Input } from "../../components/ui/Input/index";

export default function Signup() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>


      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo sujeito pizzaria" />
        
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />


            <Button
              type="submit"
              loading={false}
            >
              Cadastrar
            </Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  )
}
