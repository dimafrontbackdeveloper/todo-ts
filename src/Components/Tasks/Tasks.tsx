import React from 'react';
import Task from './Task/Task';

type TaskType = {
  id: string;
  taskText: string;
};

type TasksType = {
  tasks: Array<TaskType>;
  deleteTask: (id: number | string) => void;
};

const Tasks: React.FC<TasksType> = ({ tasks, deleteTask }) => {
  return (
    <div className="tasks" style={{ marginTop: '50px' }}>
      {tasks.map((task: TaskType) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default Tasks;
