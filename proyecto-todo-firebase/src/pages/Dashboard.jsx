import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = UserContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <div>Dashboard</div>;
};