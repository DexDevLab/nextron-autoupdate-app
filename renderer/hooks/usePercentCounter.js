import { useEffect, useState } from "react";

// Simulates a percent counter, from 0 to 100, using setInterval() to achieve a stable and fancy progression
const usePercentCounter = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  const [reachProgress, setReachProgress] = useState(100);
  const progressionInterval = 120;
  const progressionStep = 1;
  const progressionRate = progressionInterval / progressionStep;

  const run = (running) => {
    setActive(running);
  };

  const reset = () => {
    setResetCount(true);
  };

  const reach = (value) => {
    if (!active) {
      run(true);
    }
    setReachProgress(value);
  };

  useEffect(() => {
    let count;
    if (active) {
      count = setInterval(() => {
        if (progress === reachProgress) {
          run(false);
        } else {
          setProgress(progress + progressionStep);
        }
      }, progressionRate);
    }
    if (resetCount) {
      if (active && progress > 0) {
        const waitToReset = setInterval(() => {
          if (progress === reachProgress) {
            run(false);
            setProgress(0);
            setReachProgress(100);
            setResetCount(false);
            clearInterval(waitToReset);
          }
        }, progressionRate);
      } else {
        setProgress(0);
        setResetCount(false);
      }
    }

    return () => clearInterval(count);
  }, [active, progress, reachProgress, resetCount]);

  return [progress, run, reset, reach];
};

export default usePercentCounter;
