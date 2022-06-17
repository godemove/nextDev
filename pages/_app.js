import '/styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps, AppProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Pomodoro' />
        <meta name='keywords' content='Pomodoro' />
        <title>Pomodoro</title>
        <link rel='manifest' href='/manifest.json' />
        <link
          href='tomato-512.png'
          rel='icon'
          type='image/png'
          sizes='512x512'
        />
        <link
          href='tomato-128.png'
          rel='icon'
          type='image/png'
          sizes='128x128'
        />
        <link rel='apple-touch-icon' href='tomato-128.png'></link>
        <meta name='theme-color' content='#e79491' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
