import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
        <button 
            onClick={handleLogout} 
            className="display-5" 
            style={{
              background: 'none',
              border: 'none',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
