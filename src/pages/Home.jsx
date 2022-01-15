import React from 'react';
import useSound from 'use-sound';
import boopSfx from '../music/end.mp3';

export default function Home() {
  const [minute, setMinute] = React.useState('00');
  const [seconds, setSeconds] = React.useState('25');
  const [start, setStart] = React.useState(false);
  const [counter, setCounter] = React.useState(25);
  const [type, setType] = React.useState(false);

  const [play, { stop }] = useSound(boopSfx);

  React.useEffect(() => {
    let intervalId;
    if (start && counter >= 0) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSeconds(computedSecond);
        setMinute(computedMinute);

        setCounter(counter - 1);
      }, 1000);
    } else if (counter === -1) {
      play();
    } else {
      stop();
    }

    return () => clearInterval(intervalId);
  }, [start, counter]);

  React.useEffect(() => {
    if (type) {
      setCounter(5);
      setSeconds('05');
    } else {
      setCounter(25);
      setSeconds('25');
    }
  }, [type]);

  function stopTimer() {
    setStart(false);
    setCounter(25);
    setSeconds('25');
    setMinute('00');
  }

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setType(!type)}
        >
          { type ? 'Ativadade' : 'Intervalo' }
        </button>
        <input onChange={({ target }) => setCounter(target.value)} />
      </div>
      <div>
        <span>{ minute }</span>
        <span>:</span>
        <span>{ seconds }</span>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setStart(!start);
          }}
        >
          { start ? 'Pause' : 'Start' }
        </button>
        <button
          type="button"
          onClick={stopTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
