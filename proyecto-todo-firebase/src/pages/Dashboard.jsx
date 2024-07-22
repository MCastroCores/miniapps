import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  auth,
  userExists,
  registerNewTask,
  getTasks,
  updateTask,
} from "../../firebase/firebase.js";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [taskToUpload, setTaskToUpload] = useState("");
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);

        if (isRegistered) {
          navigate("/");
        } else {
          navigate("/register");
        }
      }
    });
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async (user) => {
      console.log(user.uid);
      const updatedTasks = await getTasks(user.uid);
      console.log(updatedTasks);
      setTasks(updatedTasks);
    };

    fetchTasks(user);
  }, [user, update]);

  const uploadTask = async (user, task) => {
    try {
      const newTask = {
        id: crypto.randomUUID(),
        userId: user.uid,
        text: task,
        isActive: true,
      };
      await registerNewTask(newTask);
      setTaskToUpload("");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskActive = async (task) => {
    try {
      const newTask = { ...task, isActive: !task.isActive };
      console.log(newTask);
      await updateTask(newTask);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen">
      <section className="flex flex-col p-5">
        <h1 className="text-3xl font-bold text-center">
          Dashboard de {user?.email}
        </h1>
        <h2 className="text-3xl font-bold text-center mt-5">AÑADE UNA TAREA</h2>
        <input
          type="text"
          value={taskToUpload}
          className="place-self-center border-black border-2 px-5 py-2 rounded-md my-5"
          placeholder="Tarea..."
          onChange={(e) => setTaskToUpload(e.target.value)}
        />
        <button
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg place-self-center mt-20"
          onClick={() => uploadTask(user, taskToUpload)}
        >
          SUBIR TAREA
        </button>
        <h2 className="text-3xl font-bold text-center mt-5">LISTA DE TAREAS</h2>
        {tasks ? (
          <ul className="w-3/4 place-self-center flex flex-col border border-black p-6 mt-10 rounded-md">
            {tasks.map((task) => (
              <li
                className={`font-bold p-3 flex justify-between ${
                  task.isActive ? "" : "line-through"
                }`}
                key={task.id}
              >
                {task.text}
                <button onClick={() => updateTaskActive(task)}>V</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas</p>
        )}
        <button
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg place-self-center mt-20"
          onClick={() => signOut(auth)}
        >
          CERRAR SESIÓN
        </button>
      </section>
    </main>
  );
};
