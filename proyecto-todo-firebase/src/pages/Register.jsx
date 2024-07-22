import { onAuthStateChanged } from "firebase/auth";
import { auth, registerNewUser, userExists } from "../../firebase/firebase.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const Register = () => {
  // Estado para guardar las variables que queramos del usuario registrado con google
  const { user } = useContext(UserContext);

  // Estado para manejar el completado del registro
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  // Variable navigate para redirección
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);

        if (isRegistered) {
          navigate("/");
        }
      }
    });
  }, [navigate, isRegisteredUser]);

  const handleClickToRegister = async (user) => {
    console.log(user);

    const uid = user.uid;
    const email = user.reloadUserInfo.email;

    const newUser = { uid, email };
    console.log(newUser);
    await registerNewUser(newUser);
    setIsRegisteredUser(true);
  };

  return (
    <main className="w-screen h-screen flex justify-center">
      <section className="flex flex-col justify-around">
        <button
          onClick={() => handleClickToRegister(user)}
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg"
        >
          Bienvenid@ {user?.displayName}, pulsa este botón para registrarte
        </button>
      </section>
    </main>
  );
};
