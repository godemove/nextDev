import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState('25:00');
  const [buttonText, setButtonText] = useState('Start');
  const [isRunning, setIsRunning] = useState(false);
  const [buttonState, setButtonState] = useState('pomodoro');
  const [timeID, setTimeID] = useState(null);

  const buttonStyle =
    'rounded mt-5 text-black p-1 border-2 border-gray-500 space-x-5 hover:bg-gray-400 click:text-slate-50';

  function pomo(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please stop the timer before changing the state');
      return;
    }
    setTime('25:00');
    setButtonState('pomodoro');
  }

  function shortBreak(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please stop the timer before changing the state');
      return;
    }
    setTime('05:00');
    setButtonState('shortBreak');
  }

  function longBreak(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please stop the timer before changing the state');
      return;
    }
    setTime('15:00');
    setButtonState('longBreak');
  }

  function buttonClick(e) {
    e.preventDefault();
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    document.title = `${time} - ${buttonState}`;
  }, [time, buttonState]);

  useEffect(() => {
    if (isRunning) {
      setButtonText('Stop');
      const [minutes, seconds] = time.split(':');
      const newTime = new Date(0, 0, 0, 0, minutes, seconds);

      const id = setInterval(() => {
        setTimeID(id);
        if (newTime.getSeconds() === 0 && newTime.getMinutes() === 0) {
          console.log('clearInterval', timeID);
          clearInterval(timeID);
        }
        newTime.setSeconds(newTime.getSeconds() - 1);
        setTime(
          `${newTime.getMinutes() < 10 ? '0' : ''}${newTime.getMinutes()}:${
            newTime.getSeconds() < 10 ? '0' : ''
          }${newTime.getSeconds()}`
        );
      }, 1000);
    }
    if (!isRunning) {
      setButtonText('Start');
      if (timeID !== null) {
        console.log('clearInterval', timeID);
        clearInterval(timeID);
      }
      if (buttonState === 'pomodoro') {
        setTime('25:00');
      } else if (buttonState === 'shortBreak') {
        setTime('05:00');
      } else {
        setTime('15:00');
      }
    }
  }, [buttonState, isRunning, time, timeID]);

  return (
    <div
      className="container mx-auto my-10 flex w-1/3 min-w-max flex-col	
      items-center justify-center rounded-lg bg-gray-100 opacity-75"
    >
      <div className="flex flex-row items-center justify-center space-x-5 font-mono">
        <button className={buttonStyle} onClick={(e) => pomo(e)}>
          Pomodoro
        </button>
        <button className={buttonStyle} onClick={(e) => shortBreak(e)}>
          Short Break
        </button>
        <button className={buttonStyle} onClick={(e) => longBreak(e)}>
          Long Break
        </button>
      </div>
      <p
        id="time"
        className="mt-10 rounded-lg border-2 border-gray-900 p-2 text-4xl"
      >
        {time}
      </p>
      <button
        className="mt-10 mb-5 rounded bg-white py-3 px-6 font-bold text-red-600 hover:text-red-800"
        onClick={(e) => buttonClick(e)}
      >
        {buttonText}
      </button>
    </div>
  );
}
