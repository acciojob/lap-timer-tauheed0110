
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [centiSecond, setCentiSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [list, setList] = useState([]);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        if(!pause){
          setCentiSecond((prevCentiSecond) => {
            let newCentiSecond = prevCentiSecond + 1;
    
            if (newCentiSecond === 100) {
              newCentiSecond = 0;
              setSecond((prevSecond) => {
                let newSecond = prevSecond + 1;
                if (newSecond === 60) {
                  newSecond = 0;
                  setMinute((prevMinute) => prevMinute + 1);
                }
                return newSecond;
              });
            }
            return newCentiSecond;
          });
        }
    }, 10);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [pause]);

  const formatTime = (time)=>{
    return time >= 10 ? time : `0${time}`;
  }
  const handleStart = ()=>{
    setPause(false);
  }
  const handleStop = ()=>{
    setPause(true);
  }
  const handleLap = ()=>{
    setList(prev => {
      return [...prev, displayTime()];
    })
    console.log(list)
  }
  const handleReset = ()=>{
    setCentiSecond(0);
    setSecond(0);
    setMinute(0);
    setPause(true);
    setList([]);
  }
  const displayTime = ()=>{
    return `${formatTime(minute)}:${formatTime(second)}:${formatTime(centiSecond)}`
  }
  return (
    <>
      <div>{displayTime()}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button  onClick={handleReset}>Reset</button>

      <ul>
        {
          list.map((time, index) => {
            return <li key={index}>{time}</li>
          })
        }
      </ul>
    </>
  )
}

export default App
