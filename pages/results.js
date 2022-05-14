import Link from 'next/link';
import Nav from '../components/nav';
import Head from 'next/head';

export default function Results() {
  return (
    <div className="min-h-screen bg-bgred">
      <Head>
        <title>Results</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Results" key="title" />
      </Head>
      <Nav />
      <div
        className="container mx-auto my-10 flex h-96 w-1/3 min-w-max	
      flex-col items-center rounded-lg bg-card pt-5 shadow-lg	"
      >
        <div className="mx-5 py-2 text-center text-xl text-textwhite">
          You have completed
          <a className="font-ds text-3xl"> 2 </a> big pomodoros
          <br />
          and <a className="font-ds text-3xl"> 2 </a> small pomodoros today.
        </div>
      </div>
    </div>
  );
}
