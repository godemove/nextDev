import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState();
  const [buttonText, setButtonText] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [buttonState, setButtonState] = useState('pomodoro');
  const [timeID, setTimeID] = useState(null);

  const buttonStyle =
    'rounded mt-5 text-black px-3 py-1 bg-btn space-x-5 active:bg-btnactive font-inter';

  function pomo(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please STOP the timer before changing the state');
      return;
    }
    if (time === undefined) {
      setTime('25:00');
    } else if (time === '25:00') {
      setTime('50:00');
    } else {
      setTime('25:00');
    }
    setButtonState('pomodoro');
  }

  function shortBreak(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please STOP the timer before changing the state');
      return;
    }
    setTime('05:00');
    setButtonState('shortBreak');
  }

  function longBreak(e) {
    e.preventDefault();
    if (isRunning) {
      alert('Please STOP the timer before changing the state');
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
    let text = 'Pomodoro';
    if (time === '25:00' || time === '50:00') {
      text = 'Time to focus💪';
    } else if (time === '05:00' || time === '15:00') {
      text = 'Time to relax💤';
    }
    document.title = `${time} - ${text}`;
  }, [time]);

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
        setTimeID(null);
      }
      if (buttonState === 'pomodoro') {
        setTime('25:00');
      } else if (buttonState === 'shortBreak') {
        setTime('05:00');
      } else {
        setTime('15:00');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return (
    <div
      className="container mx-auto my-10 flex h-96 w-1/3 min-w-max	
      flex-col items-center justify-center rounded-lg bg-card shadow-lg"
    >
      <div className="mx-5 flex flex-row items-center justify-center space-x-5">
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
      <p className="border-gray-900 mt-10 rounded-lg py-3 px-6 font-ds text-6xl">
        {time}
      </p>
      <button
        className="text-red-600 mt-10 mb-10 rounded bg-bigbtn py-3 px-6 font-inter font-bold text-textwhite shadow-inner active:bg-btnactive"
        onClick={(e) => buttonClick(e)}
      >
        {buttonText}
      </button>
    </div>
  );
}
