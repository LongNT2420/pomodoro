import { useState, useRef, useCallback, useEffect } from "react";
import TodoList from "./TodoList";

if (localStorage.getItem("taskList")) {
  var initTaskList = JSON.parse(localStorage.getItem("taskList"));
} else {
  initTaskList = [];
}
function Todo() {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState(initTaskList);
  const [update, setUpdate] = useState(false);
  const inputRef = useRef("");
  const handleAdd = useCallback(() => {
    if (input !== "") {
      setTaskList((prev) => [input, ...prev]);
      setInput("");
    }
  }, [input]);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleDelete = (index) => {
    if (taskList.length !== 0) {
      const taskDelete = taskList.splice(index, 1);
      setTaskList((prev) => prev.filter((task) => task !== taskDelete));
    }
    setInput("");
  };

  const updateBtn = (index) => {
    setInput(taskList[index]);
    setUpdate(index);
    inputRef.current.focus();
  };
  const handleUpdate = useCallback(
    (index) => {
      taskList[index] = input;
      setTaskList(taskList);
      setUpdate(false);
      setInput("");
    },
    [input, taskList]
  );
  const keyDownHandler = useCallback(
    (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        if (update === false) {
          handleAdd();
        } else {
          handleUpdate(update);
        }
      }
    },
    [update, handleUpdate, handleAdd]
  );
  return (
    <div className="Todo-wrapper">
      <div className="Todo-header">
        <input
          className="Todo-input"
          ref={inputRef}
          type="text"
          placeholder="Task"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            keyDownHandler(e);
          }}
          value={input}
        />
        <button
          className="add-btn"
          onClick={
            update === false
              ? handleAdd
              : () => {
                  handleUpdate(update);
                }
          }
        >
          {update === false ? "Add Task" : "Update"}
        </button>
      </div>
      <TodoList
        taskList={taskList}
        handleDelete={handleDelete}
        updateBtn={updateBtn}
      />
    </div>
  );
}

export default Todo;
