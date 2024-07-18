import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, userExists } from "../../firebase/firebase.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
        const isRegistered = await userExists(user.uid);
        console.log(isRegistered);
        if (!isRegistered) {
          navigate("/");
        } else {
          navigate("/register");
        }
      }
    });
  }, [navigate]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
