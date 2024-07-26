import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import {
  deleteTask,
  getTasks,
  registerNewTask,
  updateTask,
} from "../../firebase/firebase.js";

export const useTasks = () => {
  const { user, reload, setReload } = useContext(UserContext);
  const [taskToUpload, setTaskToUpload] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async (user) => {
      if (user?.uid) {
        const updatedTasks = await getTasks(user.uid);
        setTasks(updatedTasks);
      }
    };

    fetchTasks(user);
  }, [user, reload]);

  const uploadTask = async (user, task) => {
    try {
      if (!task) {
        throw new Error("La tarea debe de tener texto");
      }

      const newTask = {
        id: crypto.randomUUID(),
        userId: user.uid,
        text: task,
        isActive: true,
      };
      await registerNewTask(newTask);
      setTaskToUpload("");
      setReload(!reload);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const updateTaskActive = async (task) => {
    try {
      const newTask = { ...task, isActive: !task.isActive };
      await updateTask(newTask);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    taskToUpload,
    setTaskToUpload,
    tasks,
    setTasks,
    error,
    setError,
    uploadTask,
    updateTaskActive,
    handleDeleteTask,
  };
};
