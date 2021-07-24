import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://60e33ab26c365a0017839208.mockapi.io/tasks',
});

// Начальная подгрузка тасков
export const getTasks = async () => {
  try {
    const responce = await instance.get('');
    if (responce.status >= 200 && responce.status < 300) {
      return responce.data;
    }
  } catch (e) {
    throw new Error(`Ошибка произошла при начальной загрузке заданий:${e}`);
  }
};

export const addTasks = async (newTask: string) => {
  try {
    return await axios.post('https://60e33ab26c365a0017839208.mockapi.io/tasks', {
      taskText: newTask,
    });
  } catch (error) {
    throw new Error(`Что-то пошло не так при попытке добавить задание : ${error}`);
  }
};

export const deleteTask = async (id: string | number) => {
  try {
    return await axios.delete(`https://60e33ab26c365a0017839208.mockapi.io/tasks/${id}`);
  } catch (error) {
    throw new Error(`Что-то пошло не так при попытке удалить задание : ${error}`);
  }
};
