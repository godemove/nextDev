import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState(null); // time string in format '00:00'
  const [buttonText, setButtonText] = useState(null); // 'Start' or 'Stop'
  const [isRunning, setIsRunning] = useState(false); // is pomo running? true or false
  const [buttonState, setButtonState] = useState(null); // 'bigPomo' or 'littlePomo' or 'shortBreak' or 'longBreak'
  const [audio, setAudio] = useState(null); // set the audio url in a variable
  const [timeId, setTimeId] = useState(null); // set the timeId in a variable
  const [pomoResult, setPomoResult] = useState(null); // store the pomo result in a variable, 1 unit = 25 minutes
  const [breakResult, setBreakResult] = useState(null); // store the break result in a variable, 1 unit = 5 minutes

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
    setAudio(new Audio('/audios/complete.wav'));
  }

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
    let p = localStorage.getItem('pomoResult');
    let b = localStorage.getItem('breakResult');
    if (p === null) {
      setPomoResult(0);
    } else {
      setPomoResult(p);
    }
    if (b === null) {
      setBreakResult(0);
    } else {
      setBreakResult(b);
    }
    console.log(pomoResult, breakResult);
  }, [pomoResult, breakResult]);

  useEffect(() => {
    if (isRunning) {
      window.onbeforeunload = () => {
        return 'Are you sure you want to leave?';
      };
      let startTime = new Date().getTime();
      let count = 0;
      setButtonText('STOP');
      let totalSec =
        parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
      // let finalTime = startTime + totalSec * 1000;

      function fixed() {
        console.log(audio);
        count++;
        totalSec--;
        let minutes = Math.floor(totalSec / 60);
        let seconds = totalSec % 60;
        if (totalSec === 0) {
          audio.play();
          if (buttonState === 'littlePomo') {
            // setPomoResult(pomoResult + 1);
            localStorage.setItem('pomoResult', parseInt(pomoResult) + 1);
            setPomoResult(parseInt(pomoResult) + 1);
          } else if (buttonState === 'bigPomo') {
            // setPomoResult(pomoResult + 2);
            localStorage.setItem('pomoResult', parseInt(pomoResult) + 2);
            setPomoResult(parseInt(pomoResult) + 2);
          } else if (buttonState === 'shortBreak') {
            // setBreakResult(breakResult + 1);
            localStorage.setItem('breakResult', parseInt(breakResult) + 1);
            setBreakResult(parseInt(breakResult) + 1);
          } else if (buttonState === 'longBreak') {
            // setBreakResult(breakResult + 3);
            localStorage.setItem('breakResult', parseInt(breakResult) + 3);
            setBreakResult(parseInt(breakResult) + 3);
          }
          setIsRunning(false);
          clearTimeout(timeId);
          // console.log('cleared', finalTime, new Date().getTime());
          return;
        }
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        setTime(`${minutes}:${seconds}`);
        let offset = new Date().getTime() - (startTime + count * 1000);
        let nextTime = 1000 - offset;
        if (nextTime < 0) {
          nextTime = 0;
        }
        // console.log(isRunning, offset, nextTime, minutes, seconds, totalSec);
        setTimeId(setTimeout(fixed, nextTime));
      }
      setTimeId(setTimeout(fixed, 1000));
    } else {
      window.onbeforeunload = null;
      setButtonText('START');
      if (timeId !== null) {
        clearTimeout(timeId);
      }
      setAudio(new Audio('./audios/button-press.wav'));
      if (buttonState === 'littlePomo' || buttonState === null) {
        setTime('25:00');
      } else if (buttonState === 'bigPomo') {
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
