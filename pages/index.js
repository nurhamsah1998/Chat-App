import Head from 'next/head';
import Sidebar from './component/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>chat app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
