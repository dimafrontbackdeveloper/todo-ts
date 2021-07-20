import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';
import Tasks from './Components/Tasks/Tasks';
import Alert from './Components/Alert/Alert';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isTaskError, setIsTaskError] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  // Начальная подгрузка
  useEffect(() => {
    // Начальная подгрузка тасков
    const getTasks = async () => {
      try {
        const responce = await axios.get('https://60e33ab26c365a0017839208.mockapi.io/tasks');
        if (responce.status >= 200 && responce.status < 300) {
          setTasks(responce.data);
        }
      } catch (error) {
        throw new Error(
          `Что-то пошло не так при попытке инициализации приложения взять таски : ${error}`,
        );
      }
    };
    getTasks();

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
  const addTask = async () => {
    // Если не будет значения у инпута,то чтобы показало ошибку и не добавилось в БД
    if (!inputValue) {
      setIsTaskError(true);
    } else {
      const newTask = inputValue;

      try {
        const responce = await axios.post('https://60e33ab26c365a0017839208.mockapi.io/tasks', {
          taskText: newTask,
        });

        if (responce.status >= 200 && responce.status < 300) {
          // Зануление инпута и получения новых данных после post запроса
          setInputValue('');
          const responce = await axios.get('https://60e33ab26c365a0017839208.mockapi.io/tasks');

          if (responce.status >= 200 && responce.status < 300) {
            setTasks(responce.data);
          }
        }
      } catch (error) {
        throw new Error(`Что-то пошло не так при попытке добавить задание : ${error}`);
      }
    }
  };

  // Удаление таски
  const deleteTask = async (id: number | string) => {
    try {
      const responce = await axios.delete(
        `https://60e33ab26c365a0017839208.mockapi.io/tasks/${id}`,
      );
      if (responce.status >= 200 && responce.status < 300) {
        setTasks(tasks.filter((task: any) => task.id !== id));
      }
    } catch (error) {
      throw new Error(`Что-то пошло не так при попытке удалить задание : ${error}`);
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
          addTask={addTask}
          inputChange={inputChange}
          inputPlaceholder={inputPlaceholder}
        />
        {tasks.length === 0 || !tasks ? (
          <div style={{ marginTop: '30px', fontSize: '20px' }}>Введите пожалуйста задачу</div>
        ) : (
          <Tasks tasks={tasks} deleteTask={deleteTask} />
        )}
      </div>
    </div>
  );
}

export default App;
