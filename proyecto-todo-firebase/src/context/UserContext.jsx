import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  userExists,
  getUser,
  registerNewUser,
} from "../../firebase/firebase.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Efecto para gestionar el cambio de autenticación al cambiar el usuario
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const registeredUser = await getUser(user.uid);
          setUser(registeredUser);
          navigate("/");
        } else {
          navigate("/register");
        }
      } else {
        navigate("/login");
      }
    });
  }, [reload, navigate]);

  // Función para autenticar al usuario con su cuenta de google
  const handleAutenticateUserWithGoogle = async () => {
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

  // Función para registrar al usuario con sus datos de la cuenta de google en nuestra bbdd
  const handleRegisterNewUser = async (user) => {
    const uid = user.uid;
    const email = user.email;
    const newUser = { uid, email };
    await registerNewUser(newUser);
    setUser(newUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        reload,
        setReload,
        handleRegisterNewUser,
        handleAutenticateUserWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
