import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export const Login = () => {
  const { handleAutenticateUserWithGoogle } = useContext(UserContext);

  const handleClickToAutenticate = async () => {
    await handleAutenticateUserWithGoogle();
  };

  return (
    <main className="w-screen h-screen flex place-content-center roboto-light">
      <section className="flex flex-col items-center justify-around">
        <h1 className="text-4xl font-bold">- TODO LIST -</h1>
        <button
          onClick={handleClickToAutenticate}
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg"
        >
          CONTINUA CON GOOGLE
        </button>
      </section>
    </main>
  );
};
