import { useContext, FormEvent, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/Home.module.scss';
import logoImg from '../../public/logo.svg';
import { Input } from '../../src/components/ui/input';
import { Button } from "../components/ui/Button";


import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';



export default function Home() {
  const { signIN } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email,
      password,
    };
    await signIN(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza- Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se!
          </Link>
        </div>
      </div>
    </>
  );
}
