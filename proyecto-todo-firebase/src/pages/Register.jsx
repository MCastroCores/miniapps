import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

export const Register = () => {
  const { user, handleRegisterNewUser, reload, setReload } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const cleanUser = async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
    if (!user) {
      cleanUser();
    }
  }, [navigate, user]);

  const handleClick = async () => {
    await handleRegisterNewUser(user);
    setReload(!reload);
  };
  return (
    <main className="w-screen h-screen flex justify-center roboto-light">
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
