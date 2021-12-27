import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router"
import styles from '../styles/PageContainer.module.css'

export default function PageContainer(props) {
  const { pathname: activePathName } = useRouter();

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
          <Link href="/" >
            <a className={!activePathName || activePathName == "/" ? styles.active : ""}>Graph</a>
          </Link>

          <Link href="/upload-sensor-data">
            <a className={activePathName == "/upload-sensor-data" ? styles.active : ""}>Upload Sensor Data</a>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        {props.children}
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
