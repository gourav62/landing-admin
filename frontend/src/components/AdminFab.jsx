import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

/**
 * Floating Admin button shown in bottom-right.
 * - If logged out, it links to /login
 * - If logged in, it links to /admin
 */
export default function AdminFAB() {
  const { token } = useContext(AuthContext);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to={token ? "/admin" : "/login"}
        className="inline-flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition"
        title={token ? "Open admin panel" : "Login as admin"}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-medium">{token ? "Admin" : "Admin Login"}</span>
      </Link>
    </div>
  );
}
