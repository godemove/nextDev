// import Image from 'next/image';
// import Link from 'next/link';
// import iconPic from '../images/icon-white.png';
// import { useState, useEffect } from 'react';

export default function Nav() {
  // const [href, setHref] = useState('/results');

  // useEffect(() => {
  //   if (window.location.pathname === '/results') {
  //     setHref('/');
  //   }
  //   if (window.location.pathname === '/') {
  //     setHref('/results');
  //   }
  // }, [href]);

  return (
    <div className='mx-auto flex w-max min-w-max items-center pt-5'>
      {/* <Image src={iconPic} alt='icon' width={30} height={30} /> */}
      <div id='title' className='pl-2 text-3xl font-bold text-textwhite'>
        {/* <Link href={href} replace> */}
          {/* Pomodoro */}
        {/* </Link> */}
      </div>
    </div>
  );
}
