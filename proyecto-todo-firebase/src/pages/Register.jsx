import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../../firebase/firebase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // Estado para guardar las variables que queramos del usuario registrado con google
  const [currentUser, setCurrentUser] = useState(1);

  // Variable navigate para redirección
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);

        if (isRegistered) {
          navigate("/");
        } else {
          setCurrentUser(user);
          setState(2);
        }
      }
    });
  }, [navigate]);

  const handleClickToAutenticate = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();

      const singInWithGoogle = async (GoogleAuthProvider) => {
        try {
          const res = await signInWithPopup(auth, googleProvider);
          setUser(res.user);
          setState(1);
        } catch (error) {
          console.log(error);
        }
      };

      await singInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserStateChanged = async (user) => {};

  const handleClickToRegister = async (user) => {};

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section>
        <button
          onClick={handleClickToRegister}
          className="bg-slate-700 text-white py-2 px-4 font-bold rounded-lg"
        >
          Bienvenid@ {currentUser.displayName}, pulsa este botón para
          registrarte
        </button>
      </section>
    </main>
  );
};
