import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { signOut } from "firebase/auth";
import {
  auth,
  registerNewTask,
  getTasks,
  updateTask,
  deleteTask,
  setUserProfilePhoto,
  getUserProfilePhotoUrl,
  updateUser,
} from "../../firebase/firebase.js";

export const Dashboard = () => {
  const { user, reload, setReload } = useContext(UserContext);
  const [taskToUpload, setTaskToUpload] = useState("");
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchTasks = async (user) => {
      if (user?.uid) {
        const updatedTasks = await getTasks(user.uid);
        console.log(updatedTasks);
        setTasks(updatedTasks);
      }
    };

    fetchTasks(user);
  }, [user, update]);

  useEffect(() => {
    const getProfileImage = async () => {
      if (user?.profilePicture) {
        const res = await getUserProfilePhotoUrl(user.profilePicture);
        setProfileImage(res);
      }
    };
    getProfileImage();
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

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (e) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileUpload = async (e) => {
    try {
      e.preventDefault();
      if (selectedImage) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedImage);
        fileReader.onload = async () => {
          try {
            const imageData = fileReader.result;
            const res = await setUserProfilePhoto(user.uid, imageData);
            await updateUser(user, res.metadata.fullPath);
            setPreviewImage(null);
            setReload(!reload);
          } catch (error) {
            console.log(error);
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-w-screen min-h-screen">
      <section className="flex flex-col justify-center items-center p-5">
        {profileImage && (
          <img
            src={profileImage}
            alt={`foto de perfil de ${user?.email}`}
            width={100}
          />
        )}
        <h1 className="text-3xl font-bold text-center mt-10 mb-10">
          Dashboard de {user?.email}
        </h1>
        <article className="flex flex-col justify-center items-center gap-y-5">
          <form
            onSubmit={handleFileUpload}
            className="flex place-content-center gap-x-5"
          >
            Elige foto de perfil:
            <input type="file" accept=".png" onChange={handleFileSelected} />
            <button className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg place-self-center">
              Subir imagen
            </button>
          </form>
          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt={`foto de perfil de ${user?.email}`}
                width={100}
              />
            </div>
          )}
        </article>
        <h2 className="text-3xl font-bold text-center mt-10">
          AÑADE UNA TAREA
        </h2>
        <input
          type="text"
          value={taskToUpload}
          className="place-self-center border-black border-2 px-5 py-2 rounded-md my-5"
          placeholder="Tarea..."
          onChange={(e) => setTaskToUpload(e.target.value)}
        />
        <button
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg place-self-center mt-5 mb-10"
          onClick={() => uploadTask(user, taskToUpload)}
        >
          SUBIR TAREA
        </button>
        <h2 className="text-3xl font-bold text-center mt-10">
          LISTA DE TAREAS
        </h2>
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
                <div>
                  <button
                    className="px-5"
                    onClick={() => updateTaskActive(task)}
                  >
                    V
                  </button>
                  <button
                    className="px-5"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    D
                  </button>
                </div>
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
