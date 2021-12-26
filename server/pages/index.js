import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Moodmetric Sensor Visualization</title>
        <meta name="description" content="Visualization of moodmetric sensor data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <label>
          Moodmetric Sensor Visualization
        </label>

        <nav>
          <Link href="/">
            <a>Graph</a>
          </Link>

          <Link href="/upload-data">
            <a>Upload Sensor Data</a>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
