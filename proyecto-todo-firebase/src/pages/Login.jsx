import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../../firebase/firebase.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const Login = () => {
  // Estado para guardar las variables que queramos del usuario registrado con google
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  // Variable navigate para redirección
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);

        if (!isRegistered) {
          navigate("/");
        }
      }
    });
  }, [navigate]);

  const handleClickToAutenticate = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();

      const singInWithGoogle = async (googleProvider) => {
        try {
          const res = await signInWithPopup(auth, googleProvider);
          setUser(res.user);
        } catch (error) {
          console.log(error);
        }
      };

      await singInWithGoogle(googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section>
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
