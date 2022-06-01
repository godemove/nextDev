import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState(null); // time string in format '00:00'
  const [buttonText, setButtonText] = useState(null); // 'Start' or 'Stop'
  const [isRunning, setIsRunning] = useState(false); // is pomo running? true or false
  const [buttonState, setButtonState] = useState(null); // 'bigPomo' or 'littlePomo' or 'shortBreak' or 'longBreak'
  const [timeID, setTimeID] = useState(null); // setInterval() returns a number, so we need to store it in a variable
  const [audio, setAudio] = useState(null); // set the audio url in a variable
  const [pomoResult, setPomoResult] = useState(0); // store the pomo result in a variable, 1 unit = 25 minutes
  const [breakResult, setBreakResult] = useState(0); // store the break result in a variable, 1 unit = 5 minutes

  console.log('NODE_VERSION:', process.env.NEXT_PUBLIC_NODE_VERSION);
  console.log('NODE_ENV:', process.env.NEXT_PUBLIC_NODE_ENV);
  console.log('AUTH_TOKEN:', process.env.AUTH_TOKEN);

  function pomo(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please STOP the timer before changing the state');
      return;
    }
    audio.play();
    if (time === undefined) {
      setTime('25:00');
      setButtonState('littlePomo');
    } else if (time === '25:00') {
      setTime('50:00');
      setButtonState('bigPomo');
    } else {
      setTime('25:00');
      setButtonState('littlePomo');
    }
  }

  function breaks(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please STOP the timer before changing the state');
      return;
    }
    audio.play();
    if (time === undefined) {
      setTime('05:00');
      setButtonState('shortBreak');
    } else if (time === '05:00') {
      setTime('15:00');
      setButtonState('longBreak');
    } else {
      setTime('05:00');
      setButtonState('shortBreak');
    }
  }

  function buttonClick(e) {
    e.preventDefault();
    audio.play();
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    setAudio(new Audio('./audios/button-press.wav'));
  }, []);

  useEffect(() => {
    let text = 'Pomodoro🍅';
    if (time === '25:00' || time === '50:00') {
      text = 'Time to focus💪';
    } else if (time === '05:00' || time === '15:00') {
      text = 'Time to relax💤';
    }
    document.title = `${time} - ${text}`;
  }, [time]);

  useEffect(() => {
    if (localStorage.getItem('pomoResult') !== null) {
      localStorage.setItem('pomoResult', pomoResult);
    }
    if (localStorage.getItem('breakResult') !== null) {
      localStorage.setItem('breakResult', breakResult);
    }
    // let _date = new Date().toISOString().slice(0, 10);
    // if (pomoResult !== null && breakResult !== null) {
    //   fetch('https://pomo.linuxconsole.ml/worker', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       date: _date,
    //       pomo: pomoResult,
    //       breaks: breakResult,
    //       auth: process.env.AUTH_TOKEN,
    //     }),
    //     mode: 'no-cors',
    //   })
    //     .then(() => {
    //       console.log('sent to server');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    console.log(pomoResult, typeof pomoResult, breakResult, typeof breakResult);
  }, [pomoResult, breakResult]);

  useEffect(() => {
    if (isRunning) {
      setButtonText('STOP');
      let [minutes, seconds] = time.split(':');
      seconds = Number(seconds);
      minutes = Number(minutes);

      const id = setInterval(() => {
        if (seconds === 0) {
          seconds = 59;
          if (minutes !== 0) {
            minutes--;
          } else {
            setAudio(new Audio('./audios/complete.mp3'));
            if (buttonState === 'littlePomo') {
              setPomoResult(pomoResult + 1);
            } else if (buttonState === 'bigPomo') {
              setPomoResult(pomoResult + 2);
            } else if (buttonState === 'shortBreak') {
              setBreakResult(breakResult + 1);
            } else if (buttonState === 'longBreak') {
              setBreakResult(breakResult + 3);
            }
            setIsRunning(false);
            return;
          }
        } else {
          seconds -= 1;
        }
        let textSeconds = seconds;
        let textMinutes = minutes;
        if (seconds < 10) {
          textSeconds = `0${seconds}`;
        }
        if (minutes < 10) {
          textMinutes = `0${minutes}`;
        }
        setTime(`${textMinutes}:${textSeconds}`);
      }, 1000);
      setTimeID(id);
    }
    if (!isRunning) {
      setButtonText('START');
      if (timeID !== null) {
        clearInterval(timeID);
        audio.play();
        setAudio(new Audio('./audios/button-press.wav'));
        setTimeID(null);
      }
      if (buttonState === 'littlePomo' || buttonState === null) {
        setTime('25:00');
      } else if (buttonState === '') {
        setTime('50:00');
      } else if (buttonState === 'shortBreak') {
        setTime('05:00');
      } else if (buttonState === 'longBreak') {
        setTime('15:00');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return (
    <div
      className='container mx-auto my-10 flex h-96 w-1/3 min-w-max 
    flex-col items-center justify-center rounded-lg bg-card shadow-lg'
    >
      <div className='mx-10 flex flex-row items-center justify-center space-x-20'>
        <button
          className='text-black mt-5 rounded bg-btn px-4 py-1 font-inter active:bg-btnactive'
          onClick={e => pomo(e)}
        >
          Focus
        </button>
        <button
          className='text-black mt-5 rounded bg-btn px-4 py-1 font-inter active:bg-btnactive'
          onClick={e => breaks(e)}
        >
          Break
        </button>
      </div>
      <p className='border-gray-900 mt-10 rounded-lg py-3 px-6 font-ds text-6xl'>
        {time}
      </p>
      <button
        className='text-red-600 text-black mt-10 mb-10 rounded bg-bigbtn py-3 px-6 font-inter font-bold
        shadow-inner active:bg-btnactive'
        onClick={e => buttonClick(e)}
      >
        {buttonText}
      </button>
    </div>
  );
}
