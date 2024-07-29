import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useTasks } from "../hooks/useTasks.jsx";
import { useImage } from "../hooks/useImage.jsx";
import { Button } from "@headlessui/react";
import { GoShieldCheck, GoShieldX } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import clsx from "clsx";

export const Dashboard = () => {
  // Elementos necesarios para gestionar el contexto de usuario
  const { user } = useContext(UserContext);

  // Elementos necesarios para la gestión de las tareas
  const {
    taskToUpload,
    setTaskToUpload,
    tasks,
    error,
    uploadTask,
    updateTaskActive,
    handleDeleteTask,
  } = useTasks();

  // Elementos necesarios para gestionar la subida de imagen de perfil
  const { previewImage, profileImage, handleFileSelected, handleFileUpload } =
    useImage();

  return (
    <main className="min-w-screen min-h-screen roboto-light">
      <section className="flex flex-col justify-center items-center p-5">
        {profileImage && (
          <img
            src={profileImage}
            alt={`foto de perfil de ${user?.email}`}
            width={100}
          />
        )}
        <h1 className="text-3xl font-bold text-center mt-10 mb-10">
          Dashboard de {user?.email.split("@")[0]}
        </h1>
        <article className="hidden sm:flex flex-col justify-center items-center gap-y-5">
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
                alt={`foto de perfil de ${user?.email.split("@")[0]}`}
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
        {error && <p className="text-sm text-red-400">{error}</p>}
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
                  task.isActive ? "" : "line-through text-green-400"
                }`}
                key={task.id}
              >
                {task.text}
                <div className="flex gap-x-5">
                  <Button
                    className={clsx(
                      "rounded py-2 px-4 text-sm text-white data-[active]:bg-sky-700",
                      {
                        "bg-yellow-500": !task.isActive,
                        "bg-green-500": task.isActive,
                      },
                      {
                        "data-[hover]:bg-yellow-950": !task.isActive,
                        "data-[hover]:bg-green-950": task.isActive,
                      }
                    )}
                    // className="rounded bg-green-500 py-2 px-4 text-sm text-white data-[hover]:bg-green-950 data-[active]:bg-sky-700"
                    onClick={() => updateTaskActive(task)}
                  >
                    {task.isActive ? <GoShieldCheck /> : <GoShieldX />}
                  </Button>
                  <Button
                    className="rounded bg-red-500 py-2 px-4 text-sm text-white data-[hover]:bg-red-800 data-[active]:bg-red-800"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <MdDeleteForever />
                  </Button>
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
