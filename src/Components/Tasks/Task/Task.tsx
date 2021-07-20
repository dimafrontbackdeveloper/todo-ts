type TaskType = {
  task: {
    id: string;
    taskText: string;
  };
  deleteTask: (id: number | string) => void;
};

const Task: React.FC<TaskType> = ({ task, deleteTask }) => {
  return (
    <div
      key={task.id}
      className="d-flex bd-highlight border border-info align-items-center p-2 flex-grow-1 bd-highlight"
      style={{ marginBottom: '30px' }}>
      <div className="p-2 flex-grow-1 bd-highlight">{task.taskText}</div>
      <div style={{ marginRight: '15px' }}>
        <button className="btn-close " type="button" onClick={() => deleteTask(task.id)} />
      </div>
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onClick={() => deleteTask(task.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default Task;
