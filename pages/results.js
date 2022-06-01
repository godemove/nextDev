import Link from 'next/link';
import Nav from '../components/nav';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseURL = 'https://pomo.linuxconsole.ml/worker';

export default function Results({ pomoResult_, breakResult_ }) {
  const [pomoResult, setPomoResult] = useState(pomoResult_);
  const [breakResult, setBreakResult] = useState(breakResult_);

  useEffect(() => {
    let pomo = pomoResult_ * 25;
    if (pomo === 0) {
      setPomoResult(pomo + ' minutes');
    } else {
      setPomoResult(pomo + ' minute');
    }

    let breaks = breakResult_ * 5;
    if (breaks === 0) {
      setBreakResult(breaks + ' minutes');
    } else {
      setBreakResult(breaks + ' minute');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen bg-bgred'>
      <Head>
        <title>Results</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='Results' key='title' />
      </Head>
      <Nav />
      <div className='container my-10 mx-auto flex h-96 w-1/3 flex-col items-center rounded-lg bg-card pt-5 shadow-lg	'>
        <div className='mx-5 py-2 text-center text-xl text-textwhite'>
          You&apos;ve been focused for {pomoResult} and relaxed for{' '}
          {breakResult}.
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const day = new Date().toISOString().slice(0, 10);
  const data = await axios
    .get(`${baseURL}?key=${day}`)
    .then(res => res.data)
    .catch(err => console.log(err));

  return {
    props: {
      pomoResult_: data.pomo,
      breakResult_: data.breaks,
    },
  };
}
