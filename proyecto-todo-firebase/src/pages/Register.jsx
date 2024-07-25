import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export const Register = () => {
  const { user, handleRegisterNewUser, reload, setReload } =
    useContext(UserContext);

  const handleClick = async () => {
    await handleRegisterNewUser(user);
    setReload(!reload);
  };
  return (
    <main className="w-screen h-screen flex justify-center">
      <section className="flex flex-col justify-around">
        <button
          onClick={handleClick}
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg"
        >
          Bienvenido {user?.displayName}, pulsa este botón para registrarte
        </button>
      </section>
    </main>
  );
};
