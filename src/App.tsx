import React, { useEffect, useState } from 'react';
import './App.css';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';
import Tasks from './Components/Tasks/Tasks';
import Alert from './Components/Alert/Alert';
import { addTasks, deleteTask, getTasks } from './api/api';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [isTaskError, setIsTaskError] = useState<boolean>(false);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>('');

  type TasksType = {
    id: string;
    taskText: string;
  };

  // Начальная подгрузка
  useEffect(() => {
    // Начальная подгрузка тасков
    const initialGetTasks = async () => {
      const responce: Array<TasksType> = await getTasks();
      setTasks(responce);
    };
    initialGetTasks();

    // Создание плейсхолдер для инпута
    changeInputPlaceholder();
  }, []);

  // Функция для измененя плейсхолдера у инпута
  const changeInputPlaceholder = () => {
    // Массив значений которые будут плейсхолдером у инпута
    const inputPlaceholders = [
      'Погулять с собакой',
      'Сделать уроки',
      'Написать диплом',
      'Позвонить другу',
      'Купить хлеб',
    ];

    // Рандомное значение массива которое будет плейсхолдером у input
    const inputPlaceholderGetNumber = Math.floor(Math.random() * inputPlaceholders.length);
    setInputPlaceholder(inputPlaceholders[inputPlaceholderGetNumber]);
  };

  // Добавление таски
  const getTasksOnClick = async () => {
    // Если не будет значения у инпута,то чтобы показало ошибку и не добавилось в БД
    if (!inputValue) {
      setIsTaskError(true);
    } else {
      const newTask = inputValue;

      const responce = await addTasks(newTask);
      if (responce.status >= 200 && responce.status < 300) {
        const tasks: Array<TasksType> = await getTasks();

        setTasks(tasks);
        setInputValue('');
      }
    }
  };

  // Удаление таски
  const deleteTaskOnClick = async (id: number | string) => {
    const responce = await deleteTask(id);

    if (responce.status >= 200 && responce.status < 300) {
      setTasks(tasks.filter((task: any) => task.id !== id));
    }
  };

  // Отлавливание изменения инпута
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Добавление в инпут вводимого значения
    setInputValue(e.target.value);

    // если была ошибка ('Заполните поле вашей задачей'),то чтобы при изменении инпута ошибка убралась
    setIsTaskError(false);

    // чтобы после изменения инпута взялось новое рандомное значение и присвоилось в плейсхолдер инпута
    changeInputPlaceholder();
  };

  return (
    <div className="App">
      <div className="container">
        {isTaskError && (
          <Alert additionalClassName={'alert-danger'} text={'Заполните поле вашей задачей'} />
        )}
        <AddTaskForm
          inputValue={inputValue}
          getTasksOnClick={getTasksOnClick}
          inputChange={inputChange}
          inputPlaceholder={inputPlaceholder}
        />
        {tasks.length === 0 || !tasks ? (
          <div style={{ marginTop: '30px', fontSize: '20px' }}>Введите пожалуйста задачу</div>
        ) : (
          <Tasks tasks={tasks} deleteTaskOnClick={deleteTaskOnClick} />
        )}
      </div>
    </div>
  );
}

export default App;
