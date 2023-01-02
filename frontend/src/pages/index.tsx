import Head from "next/head";
import Image from "next/image";
import logo from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import { Button } from "../components/ui/Button/Index";
import { Input } from "../components/ui/Input";


export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>


      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo sujeito pizzaria" />
        
        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />


            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
