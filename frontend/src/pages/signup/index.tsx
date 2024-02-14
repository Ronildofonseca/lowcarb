import Head from "next/head";
import Image from "next/image"; //tag de imagem do proprio next
import styles from '../../../styles/Home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/input';
import { Button } from "../../components/ui/Button";

import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action="">
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button
              type="submit"
              loading={false} >Cadastrar</Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça Login !
          </Link>

        </div>
      </div>

    </>
  )
}
