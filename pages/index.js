import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PS Admin</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a <a href="http://localhost:3000/login">PS Admin</a>
        </h1>

        <p className={styles.description}>
          Get started !!
        </p>
      </main>

    </div>
  )
}
