import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(localStorage.getItem("token"));

  if (!authenticated)
    return <Navigate replace to="/login" />;
  
  return (
    <div>
      <p>Welcome to your Dashboard</p>
    </div>
  );
};

export default Dashboard;
