import React, { useState, useRef, useEffect } from "react";
import { useGolobalContext } from "../context";
function Timer() {
  const [start, setStart] = useState(false);
  const [bgColor, setBgcolor] = useState("--main-color");
  const [active, setActive] = useState(1);
  const startEl = useRef(null);
  const { stateTimer, countDown, setCountDown } = useGolobalContext();
  useEffect(() => {
    setCountDown({
      minute: stateTimer.pomodoro,
      second: "00",
    });
  }, [stateTimer, setCountDown]);
  function setZero(number) {
    if (number < 10) return "0" + number;
    return number;
  }
  useEffect(() => {
    const timer = {
      minute: parseInt(countDown.minute),
      second: parseInt(countDown.second),
    };
    if (start) {
      if (timer.minute === 0 && timer.second === 0) {
        setStart(false);
        setCountDown({
          minute: stateTimer.pomodoro,
          second: "00",
        });
      } else {
        if (timer.second === 0) {
          timer.second = setZero(60);
          timer.minute = setZero(timer.minute - 1);
          setCountDown(timer);
        }
        if (timer.second > 0) {
          const timerId = setTimeout(function () {
            timer.minute = setZero(timer.minute);
            timer.second = setZero(timer.second - 1);
            setCountDown(timer);
          }, 1000);
          return () => clearTimeout(timerId);
        }
      }
    }
  }, [
    start,
    countDown.minute,
    countDown.second,
    stateTimer.pomodoro,
    stateTimer.shortBreak,
    stateTimer.longBreak,
    setCountDown,
    stateTimer,
  ]);

  const handleStart = () => {
    setStart(!start);
    startEl.current.classList.toggle("btn-active");
  };
  const handlePomodoro = () => {
    setStart(false);
    setCountDown({
      minute: stateTimer.pomodoro,
      second: "00",
    });
    setBgcolor("--main-color");
    startEl.current.style.color = "var(--main-color)";
    setActive(1);
  };

  const handleShortBreak = () => {
    setStart(false);
    setCountDown({
      minute: stateTimer.shortBreak,
      second: "00",
    });
    setBgcolor("--primary-color");
    setActive(2);
    startEl.current.style.color = "var(--primary-color)";
  };

  const handleLongBreak = () => {
    setStart(false);
    setCountDown({
      minute: stateTimer.longBreak,
      second: "00",
    });
    setBgcolor("--third-color");
    setActive(3);
    startEl.current.style.color = "var(--third-color)";
  };
  return (
    <div className="timer-box-wapper">
      <style>{`body {
        background-color:var(${bgColor});
      }`}</style>
      <div className="timer-box">
        <div className="timer-box-header">
          <button
            className={
              active === 1 ? "timer-box-btn btn-active" : "timer-box-btn"
            }
            onClick={handlePomodoro}
          >
            Pomodoro
          </button>
          <button
            className={
              active === 2 ? "timer-box-btn btn-active" : "timer-box-btn"
            }
            onClick={handleShortBreak}
          >
            Short Break
          </button>
          <button
            className={
              active === 3 ? "timer-box-btn btn-active" : "timer-box-btn"
            }
            onClick={handleLongBreak}
          >
            Long Break
          </button>
        </div>
        <div className="timer-box-body">
          <h1>
            {countDown.minute}:{countDown.second}
          </h1>
        </div>
        <div className="timer-box-footer">
          <button className="btn-active" ref={startEl} onClick={handleStart}>
            {start ? "STOP" : "START"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
