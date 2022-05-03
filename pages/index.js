import Head from 'next/head';
import dynamic from 'next/dynamic';

import Nav from '../components/nav';
import Timer from '../components/timer';

export default function Home() {
  return (
    <div className="min-h-screen bg-red-400">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.cdnfonts.com/css/ds-digital"
          rel="stylesheet"
        />
        <meta property="og:title" content="Home" key="title" />
      </Head>
      <Nav />
      <Timer />
    </div>
  );
}
