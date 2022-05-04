import Image from 'next/image';

import iconPic from '../images/icon-white.png';

export default function Nav() {
  return (
    <div className="container mx-auto flex h-20 w-1/3 min-w-max items-center p-5">
      <Image
        src={iconPic}
        alt="icon"
        width={60}
        height={60}
        layout="fixed"
        className="my-px basis-1/6 rounded-lg transition-opacity duration-150 hover:opacity-75"
      />
      <div className="flex-1"></div>
      <div
        id="title"
        className="basis-1/6 rounded-lg p-2 text-center font-mono text-3xl
         font-bold text-white	 hover:bg-red-500"
      >
        Pomodoro
      </div>
    </div>
  );
}
