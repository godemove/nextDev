import Head from 'next/head';
import dynamic from 'next/dynamic';

import Nav from '../components/nav';
import Timer from '../components/timer';
import Results from './results';


export default function Home() {
  return (
    <div className="min-h-screen bg-bgred">
      <Head>
        <title>Home</title>
        <link rel="icon" href="tomato-128.png" />
      </Head>
      <Nav />
      <Timer />
    </div>
  );
}
