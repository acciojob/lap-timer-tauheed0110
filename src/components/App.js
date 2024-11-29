import React ,{useState,useRef,useEffect} from "react";
import './../styles/App.css';
 
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '20px',
  },
  timer: {
    fontSize: '2rem',
    margin: '20px 0',
  },
  controls: {
    margin: '10px 0',
  },
  button: {
    margin: '0 5px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  laps: {
    marginTop: '20px',
    textAlign: 'left',
    display: 'inline-block',
  },
};
 
const App = () => {
 
  // State for time and laps
  const [time, setTime] = useState({ minutes: 0, seconds: 0, centiseconds: 0 });
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
 
  // Reference to the timer interval
  const timerRef = useRef(null);
 
  // Start the timer
  const startTimer = () => {
    if (isRunning) return; // Prevent multiple intervals
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { minutes, seconds, centiseconds } = prevTime;
        centiseconds += 1;
        if (centiseconds === 100) {
          centiseconds = 0;
          seconds += 1;
        }
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        return { minutes, seconds, centiseconds };
      });
    }, 10);
  };
 
  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };
 
  // Record a lap
  const recordLap = () => {
    if (!isRunning) return;
    setLaps((prevLaps) => [
      ...prevLaps,
      `${padNumber(time.minutes)}:${padNumber(time.seconds)}:${padNumber(
        time.centiseconds
      )}`,
    ]);
  };
 
  // Reset the timer and laps
  const resetTimer = () => {
    stopTimer();
    setTime({ minutes: 0, seconds: 0, centiseconds: 0 });
    setLaps([]);
  };
 
  // Utility function to pad numbers
  const padNumber = (num) => String(num).padStart(2, '0');
 
  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  return (
        <div style={styles.container}>
      <h1>Lap Timer</h1>
      <div style={styles.timer}>
        {padNumber(time.minutes)}:{padNumber(time.seconds)}:
        {padNumber(time.centiseconds)}
      </div>
      <div style={styles.controls}>
        <button onClick={startTimer} style={styles.button}>Start</button>
        <button onClick={stopTimer} style={styles.button}>Stop</button>
        <button onClick={recordLap} style={styles.button}>Lap</button>
        <button onClick={resetTimer} style={styles.button}>Reset</button>
      </div>
      <div style={styles.laps}>
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {lap}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
 
export default App