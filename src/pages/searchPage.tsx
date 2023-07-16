import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Recommend.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Movie Name</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}></main>
    </>
  );
}
