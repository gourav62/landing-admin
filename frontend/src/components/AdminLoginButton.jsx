import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


export default function AdminLoginButton({ className = "" }) {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!token ? (
        <Link to="/login" className="text-sm px-3 py-1 rounded hover:text-blue-700">
          Login
        </Link>
      ) : (
        <>
          <Link to="/admin" className="px-3 py-1 bg-blue-600 text-white rounded text-sm shadow-sm hover:bg-blue-700">
            Admin
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            title="Logout"
            type="button"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
