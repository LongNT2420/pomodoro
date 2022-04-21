import { FaBackspace } from "react-icons/fa";
import { useGolobalContext } from "../context";
import { useRef } from "react";
function Layout() {
  // use Ref
  const layouRef = useRef(null);
  const pomodoro = useRef(null);
  const shortBreak = useRef(null);
  const longBreak = useRef(null);

  const { handleLayout, stateTimer, setStateTimer } = useGolobalContext();

  const handleStateTimer = () => {
    if (pomodoro != null && shortBreak != null && longBreak != null) {
      const newStateTimer = {
        pomodoro: pomodoro.current.value,
        shortBreak: shortBreak.current.value,
        longBreak: longBreak.current.value,
      };
      setStateTimer(newStateTimer);
    }
  };

  const handleCloseLayout = (e) => {
    if (layouRef.current === e.target) {
      handleLayout();
    }
  };
  return (
    <div className="layout" ref={layouRef} onClick={handleCloseLayout}>
      <div className="timer-setting-wrapper">
        <div className="timer-setting">
          <div className="timer-setting-header">
            <p className="header-title">Timers setting</p>
            <FaBackspace onClick={handleLayout} />
          </div>

          <div className="timer-setting-body">
            <div className="timer">
              <p>Time (minutes)</p>

              <div className="timer-input-box">
                <div className="timer-input">
                  <span>Pomodoro</span>
                  <input
                    ref={pomodoro}
                    type="number"
                    defaultValue={stateTimer.pomodoro}
                    min="5"
                    max="120"
                  />
                </div>

                <div className="timer-input">
                  <span>Short Break</span>
                  <input
                    ref={shortBreak}
                    type="number"
                    defaultValue={stateTimer.shortBreak}
                    min="0"
                    max="15"
                  />
                </div>

                <div className="timer-input">
                  <span>Long Break</span>
                  <input
                    ref={longBreak}
                    type="number"
                    defaultValue={stateTimer.longBreak}
                    min="15"
                    max="30"
                  />
                </div>
              </div>
            </div>

            <div className="auto-setting-box">
              <p>Auto start Breaks</p>
              <div className="setting-button">
                <div className="setting-button-circle"></div>
              </div>
            </div>

            <div className="auto-setting-box">
              <p>Auto start Pomodoros</p>
              <div className="setting-button active-btn">
                <div className="setting-button-circle"></div>
              </div>
            </div>

            <div className="timer-setting-footer">
              <button
                onClick={() => {
                  handleLayout();
                  handleStateTimer();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
