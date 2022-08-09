import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Feed from '../Components/Feed'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JIFFYGram</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../icon.png" />
      </Head>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome New Gramers
        </h1>
      <index />
        
      </main> */}


      <Feed />

    </div>
  );
}
