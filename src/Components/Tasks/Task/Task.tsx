import axios from 'axios';
import React, { useEffect, useState } from 'react';
import changeTaskIco from '../../../Icons/changeTask.ico';

type TaskType = {
  task: {
    id: string;
    taskText: string;
  };
  deleteTaskOnClick: (id: number | string) => void;
};

const Task: React.FC<TaskType> = ({ task, deleteTaskOnClick }) => {
  const [isTaskChangeMode, setIsTaskChangeMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(task.taskText);
  }, [task.taskText]);

  const changeTaskMode = (): void => {
    setIsTaskChangeMode((prev) => !prev);
  };

  const changeTask = (id: string) => async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const responce = await axios.put(
          `https://60e33ab26c365a0017839208.mockapi.io/tasks/${id}`,
          {
            taskText: inputValue,
          },
        );

        if (responce.status >= 200 && responce.status < 300) {
          setIsTaskChangeMode(false);
        }
      } catch (e) {
        throw new Error(`Ошибка произошла при попытке изменения задачи:${e}`);
      }
    }
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      key={task.id}
      className="d-flex bd-highlight border border-info align-items-center p-2 flex-grow-1 bd-highlight"
      style={{ marginBottom: '30px' }}>
      <div className="p-2 flex-grow-1 bd-highlight">
        {isTaskChangeMode ? (
          <input
            className="form-control"
            value={inputValue}
            onKeyDown={changeTask(task.id)}
            onChange={changeInputValue}
          />
        ) : (
          <input
            className=""
            value={inputValue}
            style={{ border: '0', outline: 'none', width: '100%' }}
            readOnly
          />
        )}
      </div>
      <div
        style={{ width: '30px', height: '30px', marginRight: '15px', cursor: 'pointer' }}
        onClick={changeTaskMode}>
        <img
          src={changeTaskIco}
          alt=""
          style={{ width: '100%', height: '100%' }}
          placeholder={'Изменить дело'}
        />
      </div>
      <div style={{ marginRight: '15px' }}>
        <button className="btn-close " type="button" onClick={() => deleteTaskOnClick(task.id)} />
      </div>
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onClick={() => deleteTaskOnClick(task.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default Task;
