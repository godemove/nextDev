import Head from 'next/head';
import dynamic from 'next/dynamic';

import Nav from '../components/nav';
import Timer from '../components/timer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bgred">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" key="title" />
      </Head>
      <Nav />
      <Timer />
    </div>
  );
}
