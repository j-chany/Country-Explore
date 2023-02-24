import Head from "next/head";
import styles from "@/styles/home.module.css";
import Link from "next/link";
import Menu from "@/components/Menu";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
        <Menu />
        <Image src="/chatting.png" alt="Chat PNG" width={1000} height={500} />
      </main>
    </>
  );
}
