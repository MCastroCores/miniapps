import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, userExists, getUser } from "../../firebase/firebase.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const registeredUser = await getUser(user.uid);
          setUser(registeredUser);
          console.log(registeredUser);
          navigate("/");
        } else {
          navigate("/register");
        }
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
