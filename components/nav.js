import Image from 'next/image';

import iconPic from '../images/icon-white.png';

export default function Nav() {
  return (
    <div className="mx-auto flex w-max min-w-max items-center pt-5">
      <Image src={iconPic} alt="icon" width={60} height={60} layout="fixed" />
      <div id="title" className="text-3xl font-bold text-textwhite">
        Pomodoro
      </div>
    </div>
  );
}
