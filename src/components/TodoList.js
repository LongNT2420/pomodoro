function TodoList({ taskList, handleDelete, updateBtn }) {
  return (
    <div className="Todo-body">
      <ul className="Task-list">
        {taskList.map((task, index) => {
          return (
            <li className="Task-item" key={index}>
              {task}
              <div className="Item-btn">
                <button
                  className="Delete-btn"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Del
                </button>
                <button
                  className="Change-btn"
                  onClick={() => {
                    updateBtn(index);
                  }}
                >
                  Fix
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
