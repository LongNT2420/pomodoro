import React, { useContext, useState, useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [layout, setLayout] = useState(false);

  const handleLayout = useCallback(() => {
    setLayout(!layout);
  }, [layout]);
  const [stateTimer, setStateTimer] = useState({
    pomodoro: "25",
    shortBreak: "5",
    longBreak: "15",
  });
  const [countDown, setCountDown] = useState({
    minute: stateTimer.pomodoro,
    second: "00",
  });
  return (
    <AppContext.Provider
      value={{
        layout,
        handleLayout,
        stateTimer,
        setStateTimer,
        countDown,
        setCountDown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGolobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
